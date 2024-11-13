
import { createClient } from '@supabase/supabase-js';

const URL = 'https://qitjguqgmrjhzkzvokxx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdGpndXFnbXJqaHprenZva3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MTM0MjEsImV4cCI6MjA0NzA4OTQyMX0.W2mi-7yp4luKhK7eSx5wPyCTSby7EUzIwYYr8-9oFw8';
export const supabase = createClient(URL, API_KEY);
