import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


const companions = [
  { id: uuidv4(), name: "Math", subject: "Algebra", topic: "Numbers", duration: 5, color: "#E4D0FB", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Science", subject: "Biology", topic: "Cells", duration: 8, color: "#FDFEBF", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "History", subject: "Ancient", topic: "Egypt", duration: 6, color: "#BDE6FD", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Geography", subject: "Maps", topic: "World", duration: 7, color: "#FFEECB", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Chemistry", subject: "Elements", topic: "Atoms", duration: 9, color: "#FEC9E4", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Physics", subject: "Motion", topic: "Forces", duration: 10, color: "#FDFEBF", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Art", subject: "Painting", topic: "Colors", duration: 4, color: "#FEC9E4", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Music", subject: "Notes", topic: "Instruments", duration: 6, color: "#BDE6FD", style: "Friendly", voice: "Calm" },
  { id: uuidv4(), name: "Programming", subject: "JavaScript", topic: "Code", duration: 12, color: "#C6FEDE", style: "Friendly", voice: "Calm" },
];

async function seed() {
  console.log(">>\n⏳ Clearing old companions...");
  const { error: delError } = await supabase.from('companions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) {
    console.error("❌ Error clearing companions:", delError);
    return;
  }

  console.log("⏳ Inserting new companions...");
  const { error: insertError } = await supabase.from('companions').insert(companions);
  if (insertError) {
    console.error("❌ Error inserting companions:", insertError);
    return;
  }

  console.log("✅ Companions seeded successfully!");
}

seed();
