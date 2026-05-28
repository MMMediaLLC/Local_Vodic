// Converts Supabase snake_case rows to camelCase frontend types and back.

export function dbProfileToFrontend(row: any) {
  return {
    id:                 row.id,
    name:               row.name,
    slug:               row.slug,
    category:           row.category,
    categorySlug:       row.category_slug,
    location:           row.location,
    shortDescription:   row.short_description,
    fullDescription:    row.full_description,
    phone:              row.phone,
    ...(row.secondary_phone   && { secondaryPhone:   row.secondary_phone }),
    ...(row.email             && { email:            row.email }),
    ...(row.website           && { website:          row.website }),
    ...(row.facebook          && { facebook:         row.facebook }),
    ...(row.instagram         && { instagram:        row.instagram }),
    address:            row.address,
    ...(row.working_hours     && { workingHours:     row.working_hours }),
    ...(row.google_maps_url   && { googleMapsUrl:    row.google_maps_url }),
    ...(row.logo              && { logo:             row.logo }),
    ...(row.logo_shape        && { logoShape:        row.logo_shape }),
    ...(row.cover_image       && { coverImage:       row.cover_image }),
    ...(row.gallery_images?.length && { galleryImages: row.gallery_images }),
    ...(row.services?.length       && { services:      row.services }),
    isFeatured:         row.is_featured,
    isVerified:         row.is_verified,
    isPending:          row.is_pending,
    verificationStatus: row.verification_status ?? 'unverified',
    ...(row.verified_at   && { verifiedAt:   row.verified_at }),
    ...(row.submitted_at  && { submittedAt:  row.submitted_at }),
  };
}

export function frontendProfileToDb(p: any) {
  return {
    id:                  p.id,
    name:                p.name               ?? '',
    slug:                p.slug               ?? '',
    category:            p.category           ?? '',
    category_slug:       p.categorySlug       ?? '',
    location:            p.location           ?? 'Гостивар',
    short_description:   p.shortDescription   ?? '',
    full_description:    p.fullDescription    ?? '',
    phone:               p.phone              ?? '',
    secondary_phone:     p.secondaryPhone     ?? null,
    email:               p.email              ?? null,
    website:             p.website            ?? null,
    facebook:            p.facebook           ?? null,
    instagram:           p.instagram          ?? null,
    address:             p.address            ?? '',
    working_hours:       p.workingHours       ?? null,
    google_maps_url:     p.googleMapsUrl      ?? null,
    logo:                p.logo               ?? null,
    logo_shape:          p.logoShape          ?? 'square',
    cover_image:         p.coverImage         ?? null,
    gallery_images:      p.galleryImages      ?? [],
    services:            p.services           ?? [],
    is_featured:         p.isFeatured         ?? false,
    is_verified:         p.isVerified         ?? false,
    is_pending:          p.isPending          ?? false,
    verification_status: p.verificationStatus ?? 'unverified',
    verified_at:         p.verifiedAt         ?? null,
    submitted_at:        p.submittedAt        ?? null,
    updated_at:          new Date().toISOString(),
  };
}

export function dbCategoryToFrontend(row: any) {
  return {
    id:          row.id,
    name:        row.name,
    slug:        row.slug,
    description: row.description ?? '',
    icon:        row.icon        ?? '',
    color:       row.color       ?? 'blue',
    count:       row.count       ?? 0,
  };
}

export function frontendCategoryToDb(c: any) {
  return {
    id:          c.id,
    name:        c.name        ?? '',
    slug:        c.slug        ?? '',
    description: c.description ?? '',
    icon:        c.icon        ?? '',
    color:       c.color       ?? 'blue',
    count:       c.count       ?? 0,
  };
}

export function dbLocationToFrontend(row: any) {
  return {
    id:           row.id,
    name:         row.name,
    slug:         row.slug,
    ...(row.parent_region && { parentRegion: row.parent_region }),
  };
}

export function frontendLocationToDb(l: any) {
  return {
    id:            l.id,
    name:          l.name          ?? '',
    slug:          l.slug          ?? '',
    parent_region: l.parentRegion  ?? null,
  };
}

export function dbContactToFrontend(row: any) {
  return {
    id:       row.id,
    title:    row.title,
    category: row.category,
    phone:    row.phone,
    ...(row.secondary_phone && { secondaryPhone: row.secondary_phone }),
    ...(row.address         && { address:        row.address }),
    ...(row.notes           && { notes:          row.notes }),
    icon:     row.icon,
  };
}

export function frontendContactToDb(c: any) {
  return {
    id:              c.id,
    title:           c.title           ?? '',
    category:        c.category        ?? '',
    phone:           c.phone           ?? '',
    secondary_phone: c.secondaryPhone  ?? null,
    address:         c.address         ?? null,
    notes:           c.notes           ?? null,
    icon:            c.icon            ?? '',
  };
}

export function dbArticleToFrontend(row: any) {
  return {
    id:                  row.id,
    title:               row.title,
    slug:                row.slug,
    excerpt:             row.excerpt             ?? '',
    content:             row.content             ?? '',
    image_url:           row.image_url           ?? '',
    related_profile_ids: row.related_profile_ids ?? [],
    created_at:          row.created_at,
  };
}

export function frontendArticleToDb(a: any) {
  return {
    id:                  a.id,
    title:               a.title               ?? '',
    slug:                a.slug                ?? '',
    excerpt:             a.excerpt             ?? '',
    content:             a.content             ?? '',
    image_url:           a.image_url           ?? '',
    related_profile_ids: a.related_profile_ids ?? [],
    created_at:          a.created_at          ?? new Date().toISOString(),
  };
}
