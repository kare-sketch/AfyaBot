# AfyaBot — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** March 2026  
**Status:** Prototype / Presentation Demo  
**Stack:** Next.js 14 (App Router) + Supabase + Tailwind CSS + Vercel  

---

## 1. Product Overview

AfyaBot is a mobile-first web application for personal health monitoring. Users log symptoms with severity ratings, receive AI-curated natural remedy suggestions and lifestyle recommendations, and get health fact notifications personalized by age, gender, and location.

**Target:** Academic project prototype — must be functional enough for a live demo/presentation.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | `npx create-next-app@latest afyabot --typescript --tailwind --app --eslint` |
| Styling | Tailwind CSS + shadcn/ui | Install: `npx shadcn-ui@latest init` |
| Database | Supabase (PostgreSQL) | Free tier. Auth + DB + Realtime |
| Auth | Supabase Auth | Email/password signup. Google OAuth optional |
| Hosting | Vercel | Connect GitHub repo, auto-deploys on push |
| AI Layer | Static JSON mappings | No LLM API needed for prototype — use curated symptom→remedy mappings |
| Icons | Lucide React | Already included with shadcn/ui |

---

## 3. Information Architecture

```
afyabot/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Supabase provider
│   │   ├── page.tsx                # Landing / marketing page
│   │   ├── login/
│   │   │   └── page.tsx            # Login form
│   │   ├── signup/
│   │   │   └── page.tsx            # Signup form (collects age, gender, location)
│   │   ├── dashboard/
│   │   │   ├── page.tsx            # Main dashboard — symptom overview + health tip
│   │   │   ├── log/
│   │   │   │   └── page.tsx        # Log new symptom
│   │   │   ├── history/
│   │   │   │   └── page.tsx        # Symptom history timeline
│   │   │   ├── remedies/
│   │   │   │   └── page.tsx        # Remedy recommendations
│   │   │   └── profile/
│   │   │       └── page.tsx        # User profile + settings
│   ├── components/
│   │   ├── ui/                     # shadcn components
│   │   ├── SymptomLogger.tsx       # Symptom input form
│   │   ├── SeveritySlider.tsx      # 1-10 severity rating
│   │   ├── SymptomCard.tsx         # Single symptom display
│   │   ├── SymptomChart.tsx        # Severity over time (recharts)
│   │   ├── RemedyCard.tsx          # Natural remedy suggestion
│   │   ├── HealthTipBanner.tsx     # Daily health fact notification
│   │   ├── BottomNav.tsx           # Mobile bottom navigation
│   │   └── Header.tsx              # Top bar with logo + user avatar
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser Supabase client
│   │   │   ├── server.ts           # Server Supabase client
│   │   │   └── middleware.ts       # Auth middleware
│   │   ├── remedies.ts             # Symptom → remedy mapping (JSON data)
│   │   ├── health-tips.ts          # Health tips database (JSON)
│   │   └── types.ts                # TypeScript interfaces
│   └── styles/
│       └── globals.css             # Tailwind base + custom CSS variables
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
├── public/
│   └── afyabot-logo.svg
├── .env.local                      # Supabase keys (NEVER commit)
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 4. Database Schema (Supabase SQL)

Run this in the Supabase SQL Editor:

```sql
-- ============================================
-- AFYABOT DATABASE SCHEMA
-- Run in Supabase SQL Editor
-- ============================================

-- 1. User Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  age INTEGER CHECK (age > 0 AND age < 150),
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  location TEXT,                    -- e.g. "Nairobi, Kenya"
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Symptom Logs
CREATE TABLE public.symptom_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  symptom_name TEXT NOT NULL,       -- e.g. "headache", "cough", "fatigue"
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 10),
  notes TEXT,                       -- optional free-text description
  logged_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Remedy Suggestions (pre-populated reference table)
CREATE TABLE public.remedies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symptom_key TEXT NOT NULL,        -- matches symptom_name in symptom_logs
  remedy_title TEXT NOT NULL,
  remedy_description TEXT NOT NULL,
  remedy_type TEXT CHECK (remedy_type IN ('natural', 'lifestyle', 'dietary', 'exercise')),
  source TEXT,                      -- citation / source URL
  severity_min INTEGER DEFAULT 1,   -- applicable severity range
  severity_max INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Health Tips (pre-populated, filtered by demographics)
CREATE TABLE public.health_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_text TEXT NOT NULL,
  category TEXT CHECK (category IN ('nutrition', 'exercise', 'mental_health', 'hygiene', 'sleep', 'general')),
  target_gender TEXT,               -- NULL = all genders
  target_age_min INTEGER DEFAULT 0,
  target_age_max INTEGER DEFAULT 150,
  target_location TEXT,             -- NULL = all locations
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Indexes for performance
CREATE INDEX idx_symptom_logs_user ON public.symptom_logs(user_id, logged_at DESC);
CREATE INDEX idx_remedies_symptom ON public.remedies(symptom_key);
CREATE INDEX idx_health_tips_targeting ON public.health_tips(target_gender, target_age_min, target_age_max);

-- 6. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_tips ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Symptom logs: users can only CRUD their own
CREATE POLICY "Users can view own symptoms" ON public.symptom_logs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own symptoms" ON public.symptom_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own symptoms" ON public.symptom_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Remedies: everyone can read (reference data)
CREATE POLICY "Anyone can view remedies" ON public.remedies
  FOR SELECT USING (true);

-- Health tips: everyone can read
CREATE POLICY "Anyone can view health tips" ON public.health_tips
  FOR SELECT USING (true);
```

---

## 5. User Flows

### Flow 1: Onboarding (First-time User)

```
Landing Page → Click "Get Started"
  → Signup Page
    → Enter: name, email, password
    → Enter: age, gender, location (dropdown of Kenyan counties)
    → Submit → Supabase Auth creates user + inserts profile row
  → Redirect to Dashboard
    → Show welcome message + daily health tip
```

### Flow 2: Log a Symptom

```
Dashboard → Tap "+" or "Log Symptom" button
  → Log Symptom Page
    → Select symptom from predefined list (searchable dropdown)
      Options: headache, cough, fever, fatigue, stomach pain,
               sore throat, back pain, nausea, dizziness, insomnia,
               joint pain, chest tightness, skin rash, anxiety
    → Drag severity slider (1-10) with color gradient (green → red)
    → Optional: add text notes
    → Tap "Save"
  → INSERT into symptom_logs
  → Show confirmation + immediate remedy suggestions
  → Redirect to Remedies Page with matched remedies
```

### Flow 3: View History & Patterns

```
Bottom Nav → Tap "History"
  → History Page
    → Timeline view: list of logged symptoms (newest first)
    → Each card shows: symptom name, severity badge, date/time, notes
    → Tap any card → expand to show details
    → Filter by: symptom type, date range
    → Chart section: line chart of severity over time per symptom (recharts)
```

### Flow 4: Get Remedy Recommendations

```
After logging → Auto-navigate to Remedies
  OR
Bottom Nav → Tap "Remedies"
  → Remedies Page
    → Cards showing matched remedies for recent symptoms
    → Each card: title, description, type badge (natural/lifestyle/dietary/exercise), source link
    → Filtered by severity range
    → If no recent symptoms: show general wellness tips
```

### Flow 5: Daily Health Tip

```
On Dashboard load:
  → Query health_tips WHERE:
      target_gender IS NULL OR target_gender = user.gender
      AND user.age BETWEEN target_age_min AND target_age_max
      AND (target_location IS NULL OR target_location = user.location)
  → Pick random tip from results
  → Display in HealthTipBanner component at top of dashboard
```

---

## 6. Component Specifications

### 6.1 Landing Page (`/`)
- Hero section with AfyaBot logo and tagline: "Your personal health companion"
- Brief feature highlights (3 cards): Track Symptoms, Get Remedies, Stay Informed
- CTA buttons: "Get Started" → /signup, "Login" → /login
- Mobile-first design, warm health-themed palette

### 6.2 SymptomLogger (`/dashboard/log`)
- Searchable dropdown for symptom selection (14 predefined symptoms)
- Severity slider: custom range input 1-10, color transitions green→yellow→orange→red
- Labels: 1-3 "Mild", 4-6 "Moderate", 7-9 "Severe", 10 "Critical"
- Notes textarea (optional, max 500 chars)
- Date/time picker (defaults to now, allows backdating)
- "Save Symptom" button with loading state

### 6.3 Dashboard (`/dashboard`)
- Greeting: "Hello, {name}" with time-of-day context
- HealthTipBanner: highlighted daily tip card
- Quick stats: total logs this week, most frequent symptom, average severity
- Recent logs: last 3 symptom cards
- Quick action: floating "+" button to log new symptom

### 6.4 History Page (`/dashboard/history`)
- Vertical timeline of symptom cards
- Each card: symptom icon, name, severity (color-coded badge), timestamp, truncated notes
- Filter bar: symptom type dropdown + date range picker
- Recharts line chart: severity trends over last 30 days
- Empty state: illustration + "No symptoms logged yet"

### 6.5 Remedies Page (`/dashboard/remedies`)
- Grouped by symptom name
- RemedyCard: icon, title, description (2-3 lines), type badge, source link
- Severity context: "Recommended for severity 4-7"
- If no symptoms logged: show general wellness recommendations

### 6.6 Bottom Navigation
- 4 tabs: Home (dashboard), Log (+), History, Profile
- Active tab highlighted
- Fixed to bottom of viewport
- Mobile-friendly touch targets (min 44px)

---

## 7. Seed Data

### 7.1 Sample Remedies (insert into `remedies` table)

```sql
INSERT INTO public.remedies (symptom_key, remedy_title, remedy_description, remedy_type, source, severity_min, severity_max) VALUES
-- Headache
('headache', 'Stay Hydrated', 'Drink at least 8 glasses of water daily. Dehydration is a common headache trigger.', 'lifestyle', 'WHO Hydration Guidelines', 1, 6),
('headache', 'Peppermint Oil', 'Apply diluted peppermint oil to temples. Studies show it can relieve tension headaches.', 'natural', 'NCCIH - Peppermint Oil', 3, 7),
('headache', 'Rest in Dark Room', 'Lie down in a quiet, dark room for 20-30 minutes. Reduce screen time.', 'lifestyle', 'Mayo Clinic', 5, 10),

-- Cough
('cough', 'Honey & Warm Water', 'Mix 1-2 tablespoons of honey in warm water or tea. Honey has natural antimicrobial properties.', 'natural', 'BMJ Evidence-Based Medicine', 1, 6),
('cough', 'Steam Inhalation', 'Inhale steam from hot water for 10-15 minutes. Add eucalyptus leaves if available.', 'natural', 'Respiratory Medicine Journal', 3, 8),
('cough', 'Ginger Tea', 'Brew fresh ginger root in hot water for 10 minutes. Ginger has anti-inflammatory properties.', 'dietary', 'Journal of Ethnopharmacology', 1, 7),

-- Fever
('fever', 'Cool Compress', 'Apply a cool, damp cloth to forehead and wrists. Helps lower body temperature naturally.', 'natural', 'American Academy of Family Physicians', 1, 6),
('fever', 'Stay Hydrated', 'Increase fluid intake — water, clear broths, oral rehydration salts. Fever increases fluid loss.', 'lifestyle', 'WHO Fever Management', 1, 10),
('fever', 'Light Clothing', 'Wear lightweight, breathable clothing. Avoid bundling up which can trap heat.', 'lifestyle', 'CDC Guidelines', 1, 8),

-- Fatigue
('fatigue', 'Power Nap', 'Take a 20-minute nap between 1-3 PM. Avoid napping longer to prevent sleep disruption.', 'lifestyle', 'Sleep Foundation', 1, 5),
('fatigue', 'Iron-Rich Foods', 'Eat more spinach, lentils, red meat, and fortified cereals. Iron deficiency is a top cause of fatigue.', 'dietary', 'WHO Nutrition Guidelines', 3, 8),
('fatigue', 'Morning Walk', 'Walk briskly for 15-20 minutes in morning sunlight. Helps reset circadian rhythm and boost energy.', 'exercise', 'Journal of Clinical Sleep Medicine', 1, 6),

-- Stomach Pain
('stomach pain', 'Ginger Infusion', 'Chew small piece of fresh ginger or brew ginger tea. Reduces nausea and stomach inflammation.', 'natural', 'Nutrients Journal', 1, 6),
('stomach pain', 'BRAT Diet', 'Eat bananas, rice, applesauce, toast. These bland foods are gentle on the stomach.', 'dietary', 'American Gastroenterological Association', 3, 7),
('stomach pain', 'Warm Compress', 'Place warm water bottle on abdomen for 15-20 minutes. Relaxes stomach muscles.', 'natural', 'GI Society', 2, 7),

-- Sore Throat
('sore throat', 'Salt Water Gargle', 'Gargle with half teaspoon salt in warm water 3-4 times daily. Reduces swelling.', 'natural', 'Mayo Clinic', 1, 7),
('sore throat', 'Warm Fluids', 'Drink warm teas, broths, and soups throughout the day. Soothes irritation.', 'dietary', 'NHS Guidelines', 1, 8),

-- Insomnia
('insomnia', 'Sleep Hygiene Routine', 'Set consistent sleep/wake times. Avoid screens 1 hour before bed. Keep room cool and dark.', 'lifestyle', 'Sleep Foundation', 1, 7),
('insomnia', 'Chamomile Tea', 'Drink chamomile tea 30 minutes before bed. Contains apigenin which promotes relaxation.', 'natural', 'Molecular Medicine Reports', 1, 6),

-- Anxiety
('anxiety', 'Deep Breathing (4-7-8)', 'Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 cycles. Activates parasympathetic nervous system.', 'lifestyle', 'Harvard Health Publishing', 1, 7),
('anxiety', 'Grounding Exercise', 'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. Anchors to present moment.', 'lifestyle', 'Psychology Today', 3, 8);
```

### 7.2 Sample Health Tips (insert into `health_tips` table)

```sql
INSERT INTO public.health_tips (tip_text, category, target_gender, target_age_min, target_age_max, target_location, source) VALUES
('Drink at least 2 litres of water daily. In warm climates, you may need more.', 'nutrition', NULL, 0, 150, NULL, 'WHO'),
('Adults need 7-9 hours of sleep. Teenagers need 8-10 hours for proper development.', 'sleep', NULL, 13, 25, NULL, 'Sleep Foundation'),
('Walking 30 minutes a day can reduce the risk of heart disease by up to 35%.', 'exercise', NULL, 18, 150, NULL, 'British Heart Foundation'),
('Wash hands with soap for at least 20 seconds before eating and after using the toilet.', 'hygiene', NULL, 0, 150, NULL, 'WHO'),
('Iron-rich foods like spinach, beans, and red meat help prevent anemia, especially for women.', 'nutrition', 'female', 13, 50, NULL, 'WHO'),
('Regular breast self-examinations are recommended monthly for women over 20.', 'general', 'female', 20, 150, NULL, 'Kenya Ministry of Health'),
('Prostate health screening is recommended annually for men over 40.', 'general', 'male', 40, 150, NULL, 'Kenya Ministry of Health'),
('Malaria prevention: sleep under treated mosquito nets, especially during rainy seasons.', 'general', NULL, 0, 150, 'Kenya', 'Kenya Ministry of Health'),
('Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.', 'general', NULL, 10, 150, NULL, 'American Academy of Ophthalmology'),
('Eating local fruits like mangoes, avocados, and pawpaw provides essential vitamins naturally.', 'nutrition', NULL, 0, 150, 'Kenya', 'FAO');
```

---

## 8. Environment Variables

Create `.env.local` in project root (never commit this):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: Supabase Dashboard → Settings → API

---

## 9. Design System

### Colors (Tailwind CSS custom config)
```js
// tailwind.config.ts — extend theme.colors
afya: {
  primary: '#0D9488',      // Teal — trust, health, calm
  secondary: '#F59E0B',    // Amber — warmth, energy
  accent: '#6366F1',       // Indigo — tech, intelligence
  danger: '#EF4444',       // Red — high severity
  warning: '#F97316',      // Orange — moderate severity
  success: '#22C55E',      // Green — low severity, positive
  bg: '#F0FDF4',           // Mint white — fresh, clean
  surface: '#FFFFFF',
  text: '#1E293B',         // Slate 800
  muted: '#94A3B8',        // Slate 400
}
```

### Typography
- Headings: `font-bold` with system sans-serif stack or Google Font "Plus Jakarta Sans"
- Body: 16px base, 1.5 line height
- The app name "AfyaBot" always styled with a leaf/health accent on the "A"

### Severity Color Scale
```
1-3:  bg-green-100 text-green-800    (Mild)
4-6:  bg-yellow-100 text-yellow-800  (Moderate)  
7-8:  bg-orange-100 text-orange-800  (Severe)
9-10: bg-red-100 text-red-800        (Critical)
```

### Mobile-First Breakpoints
- Default: mobile (< 640px) — this is the PRIMARY design
- sm (640px): minor adjustments
- md (768px): tablet layout
- lg (1024px): desktop (nice-to-have, not required for prototype)

---

## 10. Implementation Order (for Cursor)

Execute in this exact order. Each step should be a working commit.

### Step 1: Project Setup
```bash
npx create-next-app@latest afyabot --typescript --tailwind --app --eslint
cd afyabot
npm install @supabase/supabase-js @supabase/ssr
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label select slider textarea badge toast
npm install recharts lucide-react date-fns
```
- Configure tailwind.config.ts with AfyaBot colors
- Set up Supabase client files in `src/lib/supabase/`
- Add `.env.local` with Supabase credentials
- Create root layout with Supabase auth provider

### Step 2: Authentication
- Build `/login` page with email/password form
- Build `/signup` page with name, email, password, age, gender, location fields
- Create Supabase auth middleware for protected routes
- Auto-create profile row on signup (use Supabase trigger or client-side insert)
- Handle redirect after auth

### Step 3: Dashboard Shell
- Create `/dashboard/layout.tsx` with BottomNav and Header
- Build BottomNav component (Home, Log, History, Profile tabs)
- Build Header component (logo + user greeting)
- Create dashboard page with greeting, health tip banner, quick stats placeholder

### Step 4: Symptom Logging
- Build SymptomLogger component with symptom dropdown, severity slider, notes
- Build SeveritySlider with color gradient visualization
- Create `/dashboard/log` page
- Wire up Supabase insert on form submit
- Show success toast + navigate to remedies

### Step 5: Remedy Recommendations
- Create `src/lib/remedies.ts` with symptom→remedy lookup (can also query Supabase)
- Build RemedyCard component
- Create `/dashboard/remedies` page
- Query remedies based on user's most recent symptom + severity
- Show grouped remedy cards

### Step 6: Symptom History
- Create `/dashboard/history` page
- Query symptom_logs for current user, ordered by date
- Build SymptomCard for timeline display
- Add severity-colored badges
- Build SymptomChart with recharts (line chart: severity over time)
- Add basic filters (symptom type)

### Step 7: Health Tips
- Build HealthTipBanner component
- Query health_tips with demographic filtering
- Display random matching tip on dashboard
- Style with warm accent colors

### Step 8: Profile Page
- Create `/dashboard/profile` page
- Display user info from profiles table
- Allow editing name, age, gender, location
- Add logout button

### Step 9: Polish
- Add loading skeletons for all data-fetching pages
- Add empty states with illustrations
- Test all flows end-to-end on mobile viewport
- Ensure all Supabase RLS policies work correctly
- Add a simple favicon and meta tags

---

## 11. Deployment (Vercel + GitHub)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "AfyaBot v1 prototype"
git remote add origin https://github.com/YOUR_USERNAME/afyabot.git
git push -u origin main

# 2. Deploy to Vercel
# Go to vercel.com → Import Project → Select afyabot repo
# Add environment variables:
#   NEXT_PUBLIC_SUPABASE_URL
#   NEXT_PUBLIC_SUPABASE_ANON_KEY
# Deploy!
```

---

## 12. Supabase Setup Checklist

1. Create new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste and run the schema from Section 4
3. Run the seed data from Section 7
4. Go to Settings → API → copy URL and anon key to `.env.local`
5. Go to Authentication → Settings → enable Email provider
6. Optional: enable Google OAuth under Authentication → Providers

---

## 13. Scope Boundaries (What's NOT in v1)

- No real AI/LLM integration (remedies are pre-mapped)
- No push notifications (just in-app tip banner)
- No image upload for symptoms
- No doctor/professional referral system
- No multi-language support
- No data export
- No admin panel

These can all be added in v2 after the presentation.

---

## 14. Demo Script (for Presentation)

1. Open app on phone browser → show landing page
2. Sign up with demo account → show onboarding with age/gender/location
3. Land on dashboard → point out personalized health tip
4. Tap "+" → log "headache" with severity 6 → save
5. Show remedy recommendations that appear (peppermint oil, hydration, rest)
6. Log 2-3 more symptoms over "different days" (backdate)
7. Go to History → show timeline and severity chart
8. Go to Profile → show personalized data
9. Key message: "AfyaBot bridges the gap between symptom tracking and accessible health guidance"
