import React from 'react'
import { useLocation } from 'react-router-dom'

export const useSearchQuery = (name: string) => {
  const search = new URLSearchParams(useLocation().search)
  if (!name) return null
  return search.get(name)
}
