import { supabase } from "./supabase";
import type { Category, Slide, FeaturedCollection } from "../context/SettingsContext";

// --- Categories ---

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data || [];
};

export const saveCategory = async (category: Category) => {
  const { id, ...payload } = category;
  
  // If ID is very large (Date.now()), it's likely a new local ID. 
  // However, Supabase ID is auto-increment BIGINT.
  // If we are creating, we shouldn't send ID if it's not a real DB ID.
  // But here we might be sending Date.now() as ID from the frontend.
  // We need to handle this.
  
  // Strategy: If ID is less than 10000000000 (just a heuristic) or if we explicitly know it's new.
  // A better way: Let the component handle "new" vs "edit".
  
  // But to keep it simple and consistent with previous code structure:
  // We will assume if the frontend passes an ID that looks like a timestamp, we treat it as new insert (and ignore the ID),
  // UNLESS we want to keep using timestamp IDs. But Supabase uses BIGINT Identity.
  // Let's rely on Supabase returning the new ID.

  // Check if it exists? No, relying on ID presence is better.
  // But since we used Date.now() in frontend, we should check if it's a valid DB ID.
  // Existing seeds have small IDs (1, 2, 3...). Date.now() is huge.
  
  const isNew = id > 10000000000; // Heuristic for Date.now() timestamp

  if (isNew) {
    const { data, error } = await supabase
      .from("categories")
      .insert([payload])
      .select()
      .single();
      
    if (error) throw error;
    return data as Category;
  } else {
    const { data, error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
      
    if (error) throw error;
    return data as Category;
  }
};

export const deleteCategory = async (id: number) => {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
};

// --- Slides (Banners) ---

export const getSlides = async (): Promise<Slide[]> => {
  const { data, error } = await supabase
    .from("slides")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching slides:", error);
    return [];
  }
  
  // Map snake_case to camelCase
  return data.map((item: any) => ({
    id: item.id,
    subtitle: item.subtitle,
    title: item.title,
    description: item.description,
    image: item.image,
    link: item.link,
    buttonText: item.button_text
  }));
};

export const saveSlide = async (slide: Slide) => {
  const payload = {
    subtitle: slide.subtitle,
    title: slide.title,
    description: slide.description,
    image: slide.image,
    link: slide.link,
    button_text: slide.buttonText
  };

  const isNew = slide.id > 10000000000;

  if (isNew) {
    const { data, error } = await supabase
      .from("slides")
      .insert([payload])
      .select()
      .single();
      
    if (error) throw error;
    return {
        id: data.id,
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link,
        buttonText: data.button_text
    } as Slide;
  } else {
    const { data, error } = await supabase
      .from("slides")
      .update(payload)
      .eq("id", slide.id)
      .select()
      .single();
      
    if (error) throw error;
    return {
        id: data.id,
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link,
        buttonText: data.button_text
    } as Slide;
  }
};

export const deleteSlide = async (id: number) => {
  const { error } = await supabase.from("slides").delete().eq("id", id);
  if (error) throw error;
};

// --- Featured Collections ---

export const getFeaturedCollections = async (): Promise<FeaturedCollection[]> => {
  const { data, error } = await supabase
    .from("featured_collections")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching featured collections:", error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    discount: item.discount,
    image: item.image,
    link: item.link,
    linkText: item.link_text
  }));
};

export const saveFeaturedCollection = async (collection: FeaturedCollection) => {
  const payload = {
    title: collection.title,
    discount: collection.discount,
    image: collection.image,
    link: collection.link,
    link_text: collection.linkText
  };

  const isNew = collection.id > 10000000000;

  if (isNew) {
    const { data, error } = await supabase
      .from("featured_collections")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return {
        id: data.id,
        title: data.title,
        discount: data.discount,
        image: data.image,
        link: data.link,
        linkText: data.link_text
    } as FeaturedCollection;
  } else {
    const { data, error } = await supabase
      .from("featured_collections")
      .update(payload)
      .eq("id", collection.id)
      .select()
      .single();

    if (error) throw error;
    return {
        id: data.id,
        title: data.title,
        discount: data.discount,
        image: data.image,
        link: data.link,
        linkText: data.link_text
    } as FeaturedCollection;
  }
};

export const deleteFeaturedCollection = async (id: number) => {
  const { error } = await supabase.from("featured_collections").delete().eq("id", id);
  if (error) throw error;
};
