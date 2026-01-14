import api from "./api"

const coverCache = new Map();

export const getManga = async () => {
    const res = await api.get("/mangalist/")
    return res.data
}

export const getFeaturedManga = async () => {
  const res = await api.get("/featuredlist/")
  return res.data
}


/// Updated getMangaCoverArt with caching and author search
export async function getMangaCoverArt(title, author = null) {
  // Handle different author formats (string, object, or array)
  let authorName = null;
  
  if (author) {
    if (typeof author === 'string') {
      authorName = author;
    } else if (author.name) {
      // Handle author object with name property
      authorName = author.name;
    } else if (Array.isArray(author) && author.length > 0) {
      // Handle array of authors, take first one
      authorName = typeof author[0] === 'string' ? author[0] : author[0].name;
    }
  }
  
  // Create cache key from title and author
  const cacheKey = authorName ? `${title}|${authorName}` : title;
  
  // Check cache first
  if (coverCache.has(cacheKey)) {
    console.log(`Cache hit for: "${title}"${authorName ? ` by ${authorName}` : ''}`);
    return coverCache.get(cacheKey);
  }

  try {
    // Step 1: Build search URL with title and optionally author
    let searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=5`;
    
    // Add author to search if provided
    if (authorName) {
      // First, search for the author ID
      const authorSearchUrl = `https://api.mangadex.org/author?name=${encodeURIComponent(authorName)}&limit=1`;
      const authorResponse = await fetch(authorSearchUrl);
      
      if (authorResponse.ok) {
        const authorData = await authorResponse.json();
        if (authorData.data && authorData.data.length > 0) {
          const authorId = authorData.data[0].id;
          searchUrl += `&authors[]=${authorId}`;
        }
      }
    }

    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      console.error(`Search failed for "${title}":`, searchResponse.status);
      coverCache.set(cacheKey, null);
      return null;
    }

    const searchData = await searchResponse.json();

    if (!searchData.data || searchData.data.length === 0) {
      console.log(`No manga found: "${title}"${authorName ? ` by ${authorName}` : ''}`);
      coverCache.set(cacheKey, null);
      return null;
    }

    // Get the first result (most relevant)
    const manga = searchData.data[0];
    const mangaId = manga.id;

    // Step 2: Find the cover art relationship
    const coverRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
    
    if (!coverRelationship) {
      console.log(`No cover art found for: "${title}"`);
      coverCache.set(cacheKey, null);
      return null;
    }

    const coverId = coverRelationship.id;

    // Step 3: Fetch cover art details
    const coverUrl = `https://api.mangadex.org/cover/${coverId}`;
    const coverResponse = await fetch(coverUrl);
    
    if (!coverResponse.ok) {
      console.error(`Cover fetch failed for "${title}":`, coverResponse.status);
      coverCache.set(cacheKey, null);
      return null;
    }

    const coverData = await coverResponse.json();
    const fileName = coverData.data.attributes.fileName;

    // Step 4: Construct the full cover image URL
    const coverImageUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;

    // Cache the result
    coverCache.set(cacheKey, coverImageUrl);
    console.log(`Cached cover for: "${title}"${authorName ? ` by ${authorName}` : ''}`);

    return coverImageUrl;

  } catch (error) {
    console.error(`Error fetching cover art for "${title}":`, error);
    coverCache.set(cacheKey, null);
    return null;
  }
}

// Clear cache function (useful for development or manual refresh)
export function clearCoverCache() {
  coverCache.clear();
  console.log('Cover cache cleared');
}

// Get cache stats
export function getCacheStats() {
  return {
    size: coverCache.size,
    keys: Array.from(coverCache.keys())
  };
}