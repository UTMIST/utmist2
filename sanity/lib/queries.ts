import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && defined(slug.current) && !defined($search) || title match $search || category match $search || user -> name match $search] | order(_createdAt desc){
        _id,
        title,
        slug,
        _createdAt,
        user -> {
            _id, name, image, bio
        },
        views,
        description,
        category,
        image
    }`)

export const PROJECT_BY_ID_QUERY = defineQuery(`
    *[_type == "project" && _id == $id][0]{
        _id,
        title,
        slug,
        _createdAt,
        user -> {
            _id, name, image, bio, username
        },
        views,
        description,
        category,
        image,
        details,
        team,
        publishDate,
        status,
    }
    `)

export const TEAM_BY_ID_QUERY = (`
    *[_type == "team" && _id == $id][0]{
      title,
      description,
      "members": members[]->{
        _id,
        name,
        image,
        year,
        "socials": {
          "LinkedIn": socials.LinkedIn,
          "GitHub": socials.GitHub
        }
      }
    }
  `);

export const PROJECT_VIEWS_QUERY = defineQuery(`
        *[_type == 'project' && _id == $id][0]{
        _id, views
    }`)

export const USER_BY_GITHUB_ID_QUERY = defineQuery(`
        *[_type == "user" && id == $id][0]{
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        }
    `)

export const USER_BY_ID_QUERY = defineQuery(`
        *[_type == "user" && _id == $id][0]{
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        }
    `)

export const PROJECTS_BY_USER_QUERY = defineQuery(`
    *[_type == "project" && user._ref == $id]| order(_createdAt desc){
        _id,
        title,
        slug,
        _createdAt,
        user -> {
            _id, name, image, bio
        },
        views,
        description,
        category,
        image
    }`)

export const PLAYLIST_BY_SLUG_QUERY =
    defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    select[]->{
        _id,
        _createdAt,
        title,
        slug,
        user->{
            _id,
            name,
            slug,
            image,
            bio
        },
        views,
        description,
        category,
        image,
        details
    }
}`);