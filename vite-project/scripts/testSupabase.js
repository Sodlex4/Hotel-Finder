import { supabase } from '../src/utils/supabaseClient.js';

try {
  const { data, error, status } = await supabase.from('hotels').select('id').limit(1);
  if (error) {
    console.error('Supabase query error:', error);
    process.exitCode = 2;
  } else {
    console.log('Supabase query successful. status:', status);
    console.log('sample data:', data);
  }
} catch (err) {
  console.error('Unexpected error contacting Supabase:', err);
  process.exitCode = 3;
}
