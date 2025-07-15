// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fpryowahpnsiacvugple.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcnlvd2FocG5zaWFjdnVncGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzE4ODUsImV4cCI6MjA2NzgwNzg4NX0.fM1ZdQRa4oJrdXdDgbJ2D0pktF_PLsTbl_cBgeTOx9o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
