'use client'

import * as React from 'react'

type ComposeContextType = {
  composeOpen: boolean
  setComposeOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ComposeContext = React.createContext<ComposeContextType | null>(null)

export function useCompose() {
  const context = React.useContext(ComposeContext)
  if (!context) {
    throw new Error('useCompose must be used within TasksLayout')
  }
  return context
}