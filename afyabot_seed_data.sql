-- ============================================
-- AFYABOT SEED DATA — COMPREHENSIVE
-- Run in Supabase SQL Editor AFTER schema
-- ============================================


-- ============================================
-- PART 1: REMEDIES (150+ entries)
-- ============================================

-- ─────────────────────────────────────────────
-- HEADACHE
-- ─────────────────────────────────────────────
INSERT INTO public.remedies (symptom_key, remedy_title, remedy_description, remedy_type, source, severity_min, severity_max) VALUES
('headache', 'Stay Hydrated', 'Drink at least 8 glasses of water throughout the day. Dehydration is one of the most common and overlooked headache triggers. Add a pinch of salt or lemon for electrolyte balance.', 'lifestyle', 'WHO Hydration Guidelines', 1, 6),
('headache', 'Peppermint Oil Application', 'Dilute 2-3 drops of peppermint essential oil in a carrier oil (coconut or olive oil) and massage gently onto temples, forehead, and behind the ears. The menthol helps relax muscles and improve blood flow.', 'natural', 'NCCIH — Peppermint Oil Studies', 3, 7),
('headache', 'Rest in a Dark Room', 'Lie down in a quiet, dark room for 20-30 minutes. Close your eyes and practice slow, deep breathing. Light sensitivity often worsens headaches.', 'lifestyle', 'Mayo Clinic', 5, 10),
('headache', 'Cold Compress', 'Wrap ice or a cold pack in a thin towel and place on your forehead or the back of your neck for 15 minutes. Cold constricts blood vessels and reduces inflammation.', 'natural', 'Cleveland Clinic', 3, 8),
('headache', 'Caffeine (Small Dose)', 'Drink a small cup of black tea or coffee. Caffeine constricts blood vessels and can enhance the effect of pain relief. Avoid excess — too much caffeine can cause rebound headaches.', 'dietary', 'American Migraine Foundation', 2, 6),
('headache', 'Neck and Shoulder Stretches', 'Gently tilt your head side to side, roll your shoulders, and stretch your neck muscles. Tension in the neck and shoulders is a primary cause of tension headaches.', 'exercise', 'Harvard Health Publishing', 1, 5),
('headache', 'Ginger Tea', 'Grate fresh ginger into hot water and steep for 10 minutes. Ginger contains compounds that block prostaglandins, chemicals that promote inflammation and pain.', 'natural', 'Phytotherapy Research Journal', 2, 7),
('headache', 'Magnesium-Rich Foods', 'Eat bananas, dark chocolate, almonds, spinach, or avocado. Magnesium deficiency is linked to frequent headaches, especially migraines.', 'dietary', 'Journal of Neural Transmission', 1, 6),
('headache', 'Scalp Massage', 'Use your fingertips to massage your scalp in circular motions for 5-10 minutes, focusing on the temples and base of the skull. This releases muscle tension and improves circulation.', 'natural', 'Journal of Manual & Manipulative Therapy', 1, 5),
('headache', 'Reduce Screen Time', 'Take a break from screens every 30 minutes using the 20-20-20 rule: look at something 20 feet away for 20 seconds. Adjust screen brightness and use blue light filters.', 'lifestyle', 'American Academy of Ophthalmology', 1, 4),

-- ─────────────────────────────────────────────
-- COUGH
-- ─────────────────────────────────────────────
('cough', 'Honey and Warm Water', 'Mix 1-2 tablespoons of raw honey into a cup of warm water or herbal tea. Honey coats the throat and has natural antimicrobial and anti-inflammatory properties. Do NOT give honey to children under 1 year.', 'natural', 'BMJ Evidence-Based Medicine', 1, 7),
('cough', 'Steam Inhalation', 'Boil water, pour into a bowl, drape a towel over your head, and breathe in the steam for 10-15 minutes. Add eucalyptus or mint leaves for extra decongestant effect. Be careful to avoid burns.', 'natural', 'Respiratory Medicine Journal', 3, 8),
('cough', 'Ginger and Lemon Tea', 'Brew fresh sliced ginger in hot water for 10 minutes, then add fresh lemon juice and honey. Ginger suppresses cough reflexes while lemon provides vitamin C.', 'dietary', 'Journal of Ethnopharmacology', 1, 7),
('cough', 'Salt Water Gargle', 'Dissolve half a teaspoon of salt in a glass of warm water. Gargle for 15-30 seconds and spit out. Repeat 3-4 times daily. Reduces throat inflammation and loosens mucus.', 'natural', 'American Journal of Preventive Medicine', 2, 7),
('cough', 'Turmeric Milk (Golden Milk)', 'Heat a cup of milk (dairy or plant-based) with half a teaspoon of turmeric powder and a pinch of black pepper. Turmeric contains curcumin, a powerful anti-inflammatory compound.', 'dietary', 'Journal of Clinical Immunology', 1, 6),
('cough', 'Elevate Your Head While Sleeping', 'Use an extra pillow to prop your head up at night. This prevents mucus from pooling in the back of your throat, which triggers nighttime coughing.', 'lifestyle', 'Sleep Foundation', 2, 7),
('cough', 'Stay Hydrated', 'Drink warm fluids throughout the day — water, broths, herbal teas. Fluids thin mucus and keep the throat moist, reducing the cough reflex.', 'lifestyle', 'NHS Guidelines', 1, 8),
('cough', 'Thyme Tea', 'Steep 2 teaspoons of dried thyme in hot water for 10 minutes. Thyme relaxes the tracheal and bronchial muscles and has antimicrobial properties.', 'natural', 'Drug Research Journal', 2, 6),
('cough', 'Avoid Irritants', 'Stay away from smoke, dust, strong perfumes, and chemical fumes. Use a scarf or mask in dusty environments. These irritants can worsen and prolong coughing.', 'lifestyle', 'WHO Air Quality Guidelines', 1, 10),
('cough', 'Pineapple Juice', 'Drink fresh pineapple juice. Pineapple contains bromelain, an enzyme that may help suppress coughs and loosen mucus in the throat.', 'dietary', 'Biotechnology Research International', 1, 5),

-- ─────────────────────────────────────────────
-- FEVER
-- ─────────────────────────────────────────────
('fever', 'Cool Compress', 'Soak a clean cloth in cool (not ice-cold) water, wring it out, and place on your forehead, wrists, and back of the neck. Replace every few minutes. Helps lower body temperature naturally.', 'natural', 'American Academy of Family Physicians', 1, 7),
('fever', 'Increase Fluid Intake', 'Drink plenty of water, coconut water, clear broths, and oral rehydration salts (ORS). Fever significantly increases fluid loss through sweating. Aim for small, frequent sips.', 'lifestyle', 'WHO Fever Management Guidelines', 1, 10),
('fever', 'Wear Light Clothing', 'Dress in lightweight, loose, breathable cotton clothing. Remove heavy blankets. Overdressing traps body heat and can raise temperature further.', 'lifestyle', 'CDC Guidelines', 1, 8),
('fever', 'Lukewarm Sponge Bath', 'Sponge the body with lukewarm (not cold) water, focusing on the armpits, groin, and forehead. Cold water can cause shivering, which actually raises core body temperature.', 'natural', 'Pediatric Emergency Care Journal', 3, 8),
('fever', 'Rest Completely', 'Your body needs energy to fight infection. Cancel non-essential activities, sleep as much as possible, and avoid physical exertion until the fever breaks.', 'lifestyle', 'Johns Hopkins Medicine', 1, 10),
('fever', 'Eat Light, Nutritious Meals', 'Choose easily digestible foods: clear soups, porridge, bananas, boiled potatoes, toast. Avoid heavy, greasy, or spicy foods. Your digestive system slows during fever.', 'dietary', 'Harvard Medical School', 2, 8),
('fever', 'Monitor Temperature', 'Check temperature every 2-4 hours. Seek medical attention if fever exceeds 39.4°C (103°F) in adults, lasts more than 3 days, or is accompanied by severe headache, rash, or stiff neck.', 'lifestyle', 'Mayo Clinic', 5, 10),
('fever', 'Moringa Leaf Tea', 'Brew dried moringa leaves in hot water for 5-10 minutes. Moringa is widely used in East Africa as a traditional fever remedy and is rich in vitamins and antioxidants.', 'natural', 'Journal of Medicinal Plants Research', 1, 6),
('fever', 'Fenugreek Water', 'Soak a teaspoon of fenugreek seeds in water overnight, strain and drink in the morning. Fenugreek has been traditionally used to reduce fever.', 'natural', 'Indian Journal of Pharmacology', 1, 5),
('fever', 'Ventilate the Room', 'Open windows or use a fan to circulate air. A well-ventilated room helps with heat dissipation and makes breathing easier during fever.', 'lifestyle', 'WHO Housing and Health Guidelines', 1, 8),

-- ─────────────────────────────────────────────
-- FATIGUE
-- ─────────────────────────────────────────────
('fatigue', 'Power Nap', 'Take a 15-20 minute nap between 1-3 PM. Set an alarm — sleeping longer can cause grogginess and disrupt nighttime sleep. Even a short rest can restore alertness.', 'lifestyle', 'Sleep Foundation', 1, 5),
('fatigue', 'Iron-Rich Foods', 'Increase intake of spinach, lentils, beans, red meat, liver, and fortified cereals. Pair with vitamin C foods (oranges, tomatoes) to boost iron absorption. Iron deficiency is the most common nutritional cause of fatigue.', 'dietary', 'WHO Nutrition Guidelines', 3, 8),
('fatigue', 'Morning Sunlight Walk', 'Walk briskly outdoors for 15-20 minutes within the first hour of waking. Morning sunlight resets your circadian rhythm, boosts serotonin, and increases alertness.', 'exercise', 'Journal of Clinical Sleep Medicine', 1, 6),
('fatigue', 'Balanced Breakfast', 'Eat a breakfast combining protein, complex carbs, and healthy fats — e.g., eggs with whole wheat toast and avocado, or oatmeal with nuts and banana. Skipping breakfast worsens fatigue.', 'dietary', 'British Journal of Nutrition', 1, 5),
('fatigue', 'Limit Sugar Spikes', 'Avoid sugary drinks, sweets, and refined carbs that cause energy crashes. Choose whole grains, legumes, and foods with a low glycemic index for sustained energy.', 'dietary', 'American Journal of Clinical Nutrition', 1, 6),
('fatigue', 'Stay Hydrated', 'Even mild dehydration (1-2%) causes fatigue and difficulty concentrating. Keep a water bottle nearby and drink consistently throughout the day, not just when thirsty.', 'lifestyle', 'Journal of Nutrition', 1, 5),
('fatigue', 'Gentle Stretching', 'Do 5-10 minutes of gentle stretching or yoga. Focus on chest openers, spinal twists, and forward folds. Movement increases blood flow and oxygen delivery to muscles.', 'exercise', 'Journal of Physical Therapy Science', 1, 4),
('fatigue', 'B-Vitamin Rich Foods', 'Eat eggs, dairy, leafy greens, whole grains, and legumes. B vitamins (especially B12 and folate) are essential for energy metabolism. Deficiency causes persistent tiredness.', 'dietary', 'Nutrients Journal', 2, 7),
('fatigue', 'Limit Caffeine After 2 PM', 'Caffeine has a half-life of 5-6 hours. Drinking coffee or tea after 2 PM can disrupt sleep quality, creating a cycle of fatigue. Switch to herbal tea in the afternoon.', 'lifestyle', 'Journal of Clinical Sleep Medicine', 1, 5),
('fatigue', 'Cold Water Face Splash', 'Splash cold water on your face and wrists for an instant energy boost. Cold stimulates the sympathetic nervous system and increases alertness.', 'natural', 'European Journal of Applied Physiology', 1, 3),

-- ─────────────────────────────────────────────
-- STOMACH PAIN
-- ─────────────────────────────────────────────
('stomach pain', 'Ginger Infusion', 'Grate or slice fresh ginger root into hot water and steep for 10 minutes. Drink slowly. Ginger contains gingerol and shogaol, which reduce nausea, gas, and stomach inflammation.', 'natural', 'Nutrients Journal', 1, 6),
('stomach pain', 'BRAT Diet', 'Eat Bananas, Rice, Applesauce, and Toast. These bland, binding foods are gentle on the stomach, easy to digest, and help firm up stools if diarrhea is present.', 'dietary', 'American Gastroenterological Association', 3, 7),
('stomach pain', 'Warm Compress on Abdomen', 'Fill a hot water bottle or heat a towel and place on your stomach for 15-20 minutes. Heat relaxes abdominal muscles, reduces cramping, and improves blood flow to the area.', 'natural', 'GI Society', 2, 7),
('stomach pain', 'Peppermint Tea', 'Brew peppermint leaves or a peppermint tea bag in hot water for 5 minutes. Peppermint relaxes the smooth muscles of the GI tract, relieving cramps and bloating.', 'natural', 'Journal of Gastroenterology', 1, 5),
('stomach pain', 'Avoid Trigger Foods', 'Stay away from spicy, fried, acidic, and fatty foods until pain subsides. Also avoid alcohol, coffee, and carbonated drinks. Keep a food diary to identify your personal triggers.', 'dietary', 'Mayo Clinic', 1, 8),
('stomach pain', 'Eat Smaller, Frequent Meals', 'Instead of 3 large meals, eat 5-6 small meals throughout the day. Large meals overload the digestive system and increase stomach acid production.', 'lifestyle', 'National Institute of Diabetes', 1, 6),
('stomach pain', 'Fennel Seed Tea', 'Crush a teaspoon of fennel seeds and steep in hot water for 10 minutes. Fennel has antispasmodic properties that relieve bloating, gas, and stomach cramps.', 'natural', 'Journal of Food Biochemistry', 1, 5),
('stomach pain', 'Activated Charcoal (Mild Cases)', 'Activated charcoal tablets can help absorb gas and toxins causing stomach discomfort. Take as directed on the package. Not for regular use — consult a pharmacist.', 'natural', 'Toxicology Reports', 2, 5),
('stomach pain', 'Gentle Walking', 'A slow 10-15 minute walk after meals aids digestion and helps move gas through the intestines. Avoid vigorous exercise which can worsen pain.', 'exercise', 'Scandinavian Journal of Gastroenterology', 1, 4),
('stomach pain', 'Aloe Vera Juice', 'Drink 1-2 tablespoons of pure aloe vera juice (food-grade). Aloe has anti-inflammatory properties and can soothe the stomach lining. Avoid if pregnant.', 'natural', 'Journal of Research in Medical Sciences', 1, 5),

-- ─────────────────────────────────────────────
-- SORE THROAT
-- ─────────────────────────────────────────────
('sore throat', 'Salt Water Gargle', 'Dissolve half a teaspoon of salt in a full glass of warm water. Gargle for 15-30 seconds, then spit. Repeat 3-4 times daily. Salt draws out excess fluid from inflamed tissues and kills bacteria.', 'natural', 'Mayo Clinic', 1, 7),
('sore throat', 'Warm Fluids', 'Drink warm teas, clear broths, and warm water with honey throughout the day. Warm liquids soothe irritated throat tissues and keep the throat moist.', 'dietary', 'NHS Guidelines', 1, 8),
('sore throat', 'Honey and Lemon', 'Mix 2 tablespoons of honey with fresh lemon juice in warm water. Honey coats and soothes the throat while lemon cuts through mucus and provides vitamin C.', 'natural', 'Archives of Pediatrics & Adolescent Medicine', 1, 6),
('sore throat', 'Rest Your Voice', 'Avoid shouting, whispering (which actually strains vocal cords more), and prolonged talking. Communicate via text or writing when possible until the throat heals.', 'lifestyle', 'American Academy of Otolaryngology', 2, 8),
('sore throat', 'Humidify the Air', 'Use a humidifier in your bedroom or place a bowl of water near a heat source. Dry air irritates the throat. Inhaling moist air soothes inflammation.', 'lifestyle', 'Cleveland Clinic', 1, 6),
('sore throat', 'Marshmallow Root Tea', 'Steep dried marshmallow root in hot water for 10-15 minutes. It contains mucilage, a gel-like substance that coats and soothes the throat lining.', 'natural', 'Journal of Integrative Medicine', 2, 6),
('sore throat', 'Avoid Irritants', 'Do not smoke or expose yourself to secondhand smoke. Avoid alcohol and acidic drinks (orange juice, soda) which further irritate the throat.', 'lifestyle', 'WHO', 1, 10),
('sore throat', 'Turmeric Gargle', 'Add half a teaspoon of turmeric powder to warm salt water and gargle. Turmeric has strong anti-inflammatory and antiseptic properties.', 'natural', 'Indian Journal of Traditional Knowledge', 2, 7),
('sore throat', 'Suck on Ice Chips', 'Let small ice chips dissolve slowly in your mouth. The cold numbs the throat temporarily and provides hydration. Good for children who refuse to drink fluids.', 'natural', 'Pediatric Nursing Journal', 1, 5),
('sore throat', 'Sage and Echinacea Spray', 'Brew sage and echinacea into a strong tea, let it cool, and use as a throat spray. Studies show this combination can be as effective as some over-the-counter sprays.', 'natural', 'European Journal of Medical Research', 3, 7),

-- ─────────────────────────────────────────────
-- BACK PAIN
-- ─────────────────────────────────────────────
('back pain', 'Gentle Stretching Routine', 'Do cat-cow stretches, child pose, and knee-to-chest holds for 10 minutes. Stretch slowly and never bounce. Consistent gentle stretching is more effective than occasional intense stretching.', 'exercise', 'Journal of Physical Therapy Science', 1, 6),
('back pain', 'Hot and Cold Therapy', 'Apply ice for the first 48 hours (15 minutes on, 15 off) to reduce inflammation. After 48 hours, switch to heat (warm towel or hot water bottle) to relax muscles.', 'natural', 'Spine Journal', 2, 8),
('back pain', 'Improve Posture', 'Sit with feet flat on the floor, back straight, and shoulders relaxed. When standing, distribute weight evenly on both feet. Set hourly reminders to check your posture.', 'lifestyle', 'American Chiropractic Association', 1, 5),
('back pain', 'Walking', 'Walk for 20-30 minutes on flat ground at a comfortable pace. Walking strengthens the muscles supporting the spine and improves flexibility. Start slowly if in pain.', 'exercise', 'Annals of Internal Medicine', 1, 5),
('back pain', 'Core Strengthening', 'Do planks, bridges, and dead bugs to strengthen your core muscles. A strong core supports the spine and prevents recurring back pain. Start with 10-second holds.', 'exercise', 'Physical Therapy Journal', 1, 5),
('back pain', 'Sleep Position Adjustment', 'Sleep on your side with a pillow between your knees, or on your back with a pillow under your knees. Avoid sleeping on your stomach. Use a firm (not hard) mattress.', 'lifestyle', 'Sleep Foundation', 2, 7),
('back pain', 'Epsom Salt Bath', 'Add 2 cups of Epsom salt to a warm bath and soak for 15-20 minutes. Magnesium in Epsom salt is absorbed through the skin and helps relax tight muscles.', 'natural', 'Journal of Pain Research', 2, 6),
('back pain', 'Anti-Inflammatory Foods', 'Eat turmeric, ginger, fatty fish (salmon, sardines), berries, and leafy greens. These foods contain natural anti-inflammatory compounds that help reduce pain.', 'dietary', 'Nutrients Journal', 1, 6),
('back pain', 'Avoid Prolonged Sitting', 'Stand up and move every 30-45 minutes. Prolonged sitting increases pressure on spinal discs by up to 40%. Set a timer as a reminder.', 'lifestyle', 'Ergonomics Journal', 1, 5),
('back pain', 'Massage with Warm Oil', 'Warm coconut or olive oil and massage the affected area in circular motions for 10-15 minutes. Massage increases blood flow, reduces muscle tension, and promotes healing.', 'natural', 'Journal of Bodywork and Movement Therapies', 2, 7),

-- ─────────────────────────────────────────────
-- NAUSEA
-- ─────────────────────────────────────────────
('nausea', 'Ginger (Any Form)', 'Chew a small piece of fresh ginger, sip ginger tea, or take ginger candy. Ginger is one of the most well-studied natural anti-nausea remedies, effective for motion sickness, morning sickness, and general nausea.', 'natural', 'Integrative Medicine Insights', 1, 7),
('nausea', 'Peppermint Aromatherapy', 'Inhale peppermint essential oil from a cotton ball or diffuser. Even smelling fresh peppermint leaves can help. Peppermint activates anti-pain pathways that reduce nausea.', 'natural', 'Journal of PeriAnesthesia Nursing', 1, 6),
('nausea', 'Small, Bland Meals', 'Eat small amounts of dry crackers, plain rice, or toast. Avoid strong-smelling, spicy, or greasy foods. An empty stomach can actually worsen nausea.', 'dietary', 'Mayo Clinic', 1, 7),
('nausea', 'Acupressure (P6 Point)', 'Press firmly on the inside of your wrist, about 3 finger-widths below the palm, between the two tendons. Hold for 2-3 minutes. This is the P6 acupressure point used for nausea relief.', 'natural', 'Cochrane Database of Systematic Reviews', 2, 7),
('nausea', 'Stay Upright After Eating', 'Avoid lying down for at least 30 minutes after eating. Sit upright or take a gentle walk. Lying down can increase acid reflux and worsen nausea.', 'lifestyle', 'National Institute of Diabetes', 1, 5),
('nausea', 'Cold Compress on Neck', 'Place a cold, damp cloth on the back of your neck. The cold stimulates vagus nerve activity, which can help reduce the sensation of nausea.', 'natural', 'Autonomic Neuroscience Journal', 2, 6),
('nausea', 'Lemon Water', 'Squeeze fresh lemon into cold or warm water and sip slowly. The scent of lemon alone can reduce nausea. Lemon also helps neutralize stomach acids.', 'dietary', 'Iranian Red Crescent Medical Journal', 1, 5),
('nausea', 'Deep Breathing', 'Breathe in slowly through your nose for 4 counts, hold for 4, exhale through your mouth for 6. Deep breathing activates the parasympathetic nervous system and calms the stomach.', 'lifestyle', 'Autonomic Neuroscience', 1, 6),
('nausea', 'Avoid Strong Smells', 'Open windows for ventilation, avoid cooking strong-smelling foods, and stay away from perfumes or chemicals. Smell is a powerful nausea trigger.', 'lifestyle', 'Journal of Advanced Nursing', 1, 8),
('nausea', 'Fennel Seeds', 'Chew a teaspoon of fennel seeds slowly or brew into tea. Fennel has carminative properties that reduce gas, bloating, and nausea.', 'natural', 'BioMed Research International', 1, 5),

-- ─────────────────────────────────────────────
-- DIZZINESS
-- ─────────────────────────────────────────────
('dizziness', 'Sit or Lie Down Immediately', 'When dizziness strikes, sit or lie down right away to prevent falls. If lying down, keep your head slightly elevated. Wait until the sensation passes before standing.', 'lifestyle', 'Mayo Clinic', 1, 10),
('dizziness', 'Drink Water', 'Dehydration is one of the most common causes of dizziness. Drink a full glass of water immediately, then continue sipping. Add ORS if you have been sweating or vomiting.', 'lifestyle', 'American Heart Association', 1, 7),
('dizziness', 'Eat Something Sugary', 'If you suspect low blood sugar, eat a banana, some dates, or drink fruit juice. Low blood sugar (hypoglycemia) causes dizziness, shakiness, and confusion.', 'dietary', 'Diabetes UK', 1, 6),
('dizziness', 'Epley Maneuver (BPPV)', 'If dizziness is triggered by head position changes, try the Epley maneuver: a series of specific head and body movements done while seated on a bed. Look up a video guide or ask a physiotherapist.', 'exercise', 'Otology & Neurotology Journal', 3, 8),
('dizziness', 'Deep Slow Breathing', 'Breathe deeply and slowly — in through the nose for 5 counts, out through the mouth for 7 counts. This helps if dizziness is caused by hyperventilation or anxiety.', 'lifestyle', 'Chest Journal', 1, 6),
('dizziness', 'Ginger Tea', 'Brew fresh ginger in hot water and sip slowly. Ginger improves blood circulation and has been shown to reduce vertigo symptoms.', 'natural', 'Journal of Acupuncture and Meridian Studies', 1, 6),
('dizziness', 'Avoid Sudden Position Changes', 'Stand up slowly from sitting or lying positions. Sit on the edge of the bed for 30 seconds before standing. Sudden changes cause orthostatic hypotension (blood pressure drop).', 'lifestyle', 'American Family Physician', 1, 7),
('dizziness', 'Focus on a Fixed Point', 'When feeling dizzy, fix your gaze on a stationary object. This gives your brain a stable visual reference and helps your balance system recalibrate.', 'lifestyle', 'Neurology Journal', 1, 5),

-- ─────────────────────────────────────────────
-- INSOMNIA
-- ─────────────────────────────────────────────
('insomnia', 'Consistent Sleep Schedule', 'Go to bed and wake up at the same time every day — including weekends. Consistency reinforces your body natural circadian rhythm. It takes 2-3 weeks to establish.', 'lifestyle', 'Sleep Foundation', 1, 7),
('insomnia', 'Chamomile Tea Before Bed', 'Drink a cup of chamomile tea 30-60 minutes before bed. Chamomile contains apigenin, a compound that binds to brain receptors to promote relaxation and sleepiness.', 'natural', 'Molecular Medicine Reports', 1, 6),
('insomnia', 'Screen-Free Hour', 'Stop using phones, laptops, and TVs at least 1 hour before bed. Blue light from screens suppresses melatonin production, the hormone that signals sleep time.', 'lifestyle', 'Proceedings of the National Academy of Sciences', 1, 8),
('insomnia', 'Cool, Dark Bedroom', 'Keep your bedroom temperature between 16-19°C (60-67°F). Use blackout curtains or an eye mask. Even small amounts of light can disrupt melatonin production.', 'lifestyle', 'Sleep Medicine Reviews', 1, 7),
('insomnia', 'Warm Milk with Nutmeg', 'Heat a glass of milk and add a tiny pinch of ground nutmeg. Milk contains tryptophan (a sleep-promoting amino acid) and nutmeg has mild sedative properties. Traditional remedy used across East Africa.', 'dietary', 'Journal of Medicinal Food', 1, 5),
('insomnia', 'Lavender Aromatherapy', 'Place a few drops of lavender oil on your pillow or use a diffuser in the bedroom. Studies show lavender increases slow-wave sleep and helps people feel more rested.', 'natural', 'Journal of Alternative and Complementary Medicine', 1, 6),
('insomnia', '4-7-8 Breathing Technique', 'Inhale through your nose for 4 seconds, hold for 7 seconds, exhale slowly through your mouth for 8 seconds. Repeat 4 cycles. This activates the parasympathetic nervous system.', 'lifestyle', 'Harvard Health Publishing', 1, 7),
('insomnia', 'Progressive Muscle Relaxation', 'Starting from your toes, tense each muscle group for 5 seconds, then release for 30 seconds. Work up through your entire body. This physical relaxation technique helps quiet a racing mind.', 'exercise', 'Journal of Clinical Psychology', 2, 8),
('insomnia', 'Limit Caffeine After Noon', 'Caffeine stays in your system for 6-8 hours. Avoid coffee, black tea, energy drinks, and chocolate after 12 PM. Switch to herbal teas like rooibos or chamomile.', 'lifestyle', 'Journal of Clinical Sleep Medicine', 1, 6),
('insomnia', 'Valerian Root Tea', 'Steep valerian root in hot water for 10-15 minutes and drink 30 minutes before bed. Valerian has been used for centuries as a natural sleep aid.', 'natural', 'American Journal of Medicine', 2, 7),

-- ─────────────────────────────────────────────
-- JOINT PAIN
-- ─────────────────────────────────────────────
('joint pain', 'Turmeric and Black Pepper', 'Take half a teaspoon of turmeric powder with a pinch of black pepper in warm water or milk daily. Black pepper increases curcumin absorption by 2000%. Curcumin is a powerful anti-inflammatory.', 'natural', 'Journal of Medicinal Food', 1, 7),
('joint pain', 'Gentle Range-of-Motion Exercises', 'Slowly move the affected joint through its full range of motion 5-10 times, 2-3 times daily. Gentle movement prevents stiffness and maintains flexibility without stressing the joint.', 'exercise', 'Arthritis Foundation', 1, 5),
('joint pain', 'Omega-3 Fatty Foods', 'Eat fatty fish (salmon, mackerel, sardines), flaxseeds, chia seeds, and walnuts regularly. Omega-3 fatty acids reduce the production of inflammatory chemicals in the body.', 'dietary', 'Annals of Rheumatic Diseases', 1, 7),
('joint pain', 'Hot and Cold Alternating Therapy', 'Apply heat for 15 minutes (warm towel or hot water bottle) followed by cold for 10 minutes (ice pack in towel). Heat relaxes muscles; cold reduces swelling. Repeat 2-3 times.', 'natural', 'Clinical Rehabilitation Journal', 3, 8),
('joint pain', 'Epsom Salt Soak', 'Dissolve 2 cups of Epsom salt in warm bath water and soak the affected area for 20 minutes. Magnesium sulfate is absorbed through the skin, reducing inflammation and pain.', 'natural', 'Journal of Inflammation Research', 2, 7),
('joint pain', 'Maintain Healthy Weight', 'Every extra kilogram puts approximately 4 kg of extra pressure on your knees. Even modest weight loss (5-10%) significantly reduces joint pain and slows cartilage breakdown.', 'lifestyle', 'Arthritis & Rheumatology Journal', 1, 6),
('joint pain', 'Swimming or Water Exercises', 'Water supports body weight, reducing stress on joints by up to 90%. Swim or do water aerobics for 20-30 minutes. The warmth of the water also helps relax muscles.', 'exercise', 'Musculoskeletal Care Journal', 1, 6),
('joint pain', 'Ginger Compress', 'Grate fresh ginger, wrap in a cloth, and dip in hot water. Apply the warm compress to the painful joint for 15 minutes. Ginger contains compounds similar to anti-inflammatory drugs.', 'natural', 'Osteoarthritis and Cartilage Journal', 2, 7),

-- ─────────────────────────────────────────────
-- CHEST TIGHTNESS
-- ─────────────────────────────────────────────
('chest tightness', 'Deep Breathing Exercises', 'Practice diaphragmatic breathing: place one hand on your chest, one on your belly. Breathe in slowly so your belly rises (not your chest). Exhale slowly. Repeat 10 times. Helps relax chest muscles.', 'exercise', 'Respiratory Care Journal', 1, 5),
('chest tightness', 'Sit Upright', 'Sit up straight or lean slightly forward with hands on knees. This position opens the chest cavity and makes breathing easier. Avoid lying flat if you feel tightness.', 'lifestyle', 'Emergency Medicine Journal', 1, 7),
('chest tightness', 'Warm Drink', 'Sip warm water, herbal tea, or warm broth slowly. Warm fluids can help relax bronchial muscles and ease a feeling of chest tightness.', 'dietary', 'Chest Journal', 1, 5),
('chest tightness', 'Steam Inhalation', 'Inhale steam from a bowl of hot water with added eucalyptus oil for 10 minutes. Steam opens airways and loosens mucus that may be causing chest congestion.', 'natural', 'Respiratory Medicine', 2, 6),
('chest tightness', 'Seek Immediate Medical Attention', 'If chest tightness is accompanied by pain radiating to the arm or jaw, shortness of breath, cold sweat, or nausea, call emergency services immediately. These could indicate a heart attack.', 'lifestyle', 'American Heart Association', 7, 10),
('chest tightness', 'Reduce Anxiety', 'Chest tightness is a very common symptom of anxiety and panic attacks. Practice grounding: name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.', 'lifestyle', 'Journal of Clinical Psychiatry', 1, 6),
('chest tightness', 'Avoid Triggers', 'Stay away from smoke, dust, cold air, and strong fragrances. If you have asthma, ensure you have your inhaler accessible. Wear a scarf over nose/mouth in cold weather.', 'lifestyle', 'Global Initiative for Asthma (GINA)', 1, 8),

-- ─────────────────────────────────────────────
-- SKIN RASH
-- ─────────────────────────────────────────────
('skin rash', 'Cool Compress', 'Apply a clean, cool, damp cloth to the affected area for 15-20 minutes. Cold reduces itching, inflammation, and swelling. Pat dry gently — do not rub.', 'natural', 'American Academy of Dermatology', 1, 7),
('skin rash', 'Oatmeal Bath', 'Grind plain oatmeal into a fine powder, add to lukewarm bath water, and soak for 15-20 minutes. Oatmeal has anti-inflammatory properties that soothe itchy, irritated skin.', 'natural', 'Journal of Drugs in Dermatology', 2, 7),
('skin rash', 'Aloe Vera Gel', 'Apply pure aloe vera gel (directly from the plant or 100% pure commercial gel) to the rash 2-3 times daily. Aloe soothes, moisturizes, and has anti-inflammatory properties.', 'natural', 'Indian Journal of Dermatology', 1, 6),
('skin rash', 'Avoid Scratching', 'Keep nails short and try to avoid scratching, which damages skin, spreads rash, and can cause infection. Tap or pat the area instead. Wear cotton gloves at night if needed.', 'lifestyle', 'British Association of Dermatologists', 1, 8),
('skin rash', 'Identify and Remove Triggers', 'Common triggers include new soaps, detergents, fabrics, foods, or plants. Switch to fragrance-free, hypoallergenic products. Wear loose, cotton clothing over affected areas.', 'lifestyle', 'Mayo Clinic', 1, 7),
('skin rash', 'Coconut Oil Moisturizer', 'Apply virgin coconut oil to the rash after bathing. Coconut oil has antimicrobial and anti-inflammatory properties and helps restore the skin barrier.', 'natural', 'International Journal of Dermatology', 1, 5),
('skin rash', 'Hydrate and Eat Anti-Inflammatory Foods', 'Drink plenty of water and eat foods rich in omega-3s, vitamin C, and vitamin E (fish, citrus fruits, nuts, leafy greens). Good nutrition supports skin healing from inside.', 'dietary', 'Dermatology and Therapy Journal', 1, 6),
('skin rash', 'Calamine Lotion', 'Apply calamine lotion to the affected area to soothe itching and protect the skin. Available at most pharmacies. Let it dry naturally — do not bandage over it.', 'natural', 'Clinical Dermatology Journal', 1, 6),

-- ─────────────────────────────────────────────
-- ANXIETY
-- ─────────────────────────────────────────────
('anxiety', 'Deep Breathing (4-7-8 Technique)', 'Inhale through your nose for 4 seconds, hold your breath for 7 seconds, exhale slowly through your mouth for 8 seconds. Repeat 4 cycles. This activates the parasympathetic nervous system and reduces fight-or-flight response.', 'lifestyle', 'Harvard Health Publishing', 1, 7),
('anxiety', '5-4-3-2-1 Grounding Exercise', 'Identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This sensory grounding technique anchors you to the present moment and interrupts anxious thought spirals.', 'lifestyle', 'Psychology Today', 3, 8),
('anxiety', 'Physical Exercise', 'Walk briskly, jog, dance, or do any physical activity for 20-30 minutes. Exercise releases endorphins and reduces cortisol and adrenaline — the stress hormones driving anxiety.', 'exercise', 'JAMA Psychiatry', 1, 7),
('anxiety', 'Limit Caffeine', 'Reduce or eliminate coffee, energy drinks, and caffeinated teas. Caffeine stimulates the nervous system and can mimic or worsen anxiety symptoms including rapid heartbeat and restlessness.', 'dietary', 'Journal of Anxiety Disorders', 1, 6),
('anxiety', 'Journaling', 'Write down your thoughts and worries for 10-15 minutes. Getting anxious thoughts out of your head and onto paper reduces their power. Try categorizing worries as "things I can control" vs "things I cannot."', 'lifestyle', 'Advances in Psychiatric Treatment', 1, 6),
('anxiety', 'Progressive Muscle Relaxation', 'Systematically tense and release each muscle group, starting from toes and moving upward. Hold tension for 5 seconds, release for 30 seconds. Physical relaxation leads to mental calm.', 'exercise', 'Behaviour Research and Therapy', 2, 8),
('anxiety', 'Chamomile Tea', 'Drink 1-2 cups of chamomile tea. Studies show regular chamomile consumption significantly reduces generalized anxiety symptoms. The effect builds over time with regular use.', 'natural', 'Journal of Clinical Psychopharmacology', 1, 6),
('anxiety', 'Social Connection', 'Talk to a trusted friend, family member, or counselor about how you are feeling. Social support is one of the strongest buffers against anxiety. Even a brief phone call can help.', 'lifestyle', 'Psychological Bulletin', 2, 8),
('anxiety', 'Limit News and Social Media', 'Set specific times to check news and social media (e.g., once in the morning, once in the evening). Constant exposure to negative news feeds anxiety. Turn off push notifications.', 'lifestyle', 'Health Communication Journal', 1, 6),
('anxiety', 'Lavender Aromatherapy', 'Inhale lavender essential oil from a diffuser, apply diluted to wrists, or add to a warm bath. Lavender has been shown to reduce anxiety scores comparable to low-dose anti-anxiety medication.', 'natural', 'Phytomedicine Journal', 1, 6),

-- ─────────────────────────────────────────────
-- MENSTRUAL CRAMPS
-- ─────────────────────────────────────────────
('menstrual cramps', 'Warm Compress on Lower Abdomen', 'Place a hot water bottle or warm towel on your lower abdomen for 15-20 minutes. Heat relaxes the contracting uterine muscles and is clinically proven to be as effective as over-the-counter painkillers for mild cramps.', 'natural', 'Evidence-Based Nursing', 1, 7),
('menstrual cramps', 'Gentle Yoga Poses', 'Try child pose, reclining bound angle pose, and gentle spinal twists. These poses increase blood flow to the pelvic area and release tension. Avoid inversions during heavy flow if uncomfortable.', 'exercise', 'Journal of Alternative and Complementary Medicine', 1, 6),
('menstrual cramps', 'Magnesium-Rich Foods', 'Eat dark chocolate, bananas, avocados, almonds, and leafy greens during your period. Magnesium relaxes smooth muscles and reduces prostaglandin production that causes cramping.', 'dietary', 'Magnesium Research Journal', 1, 7),
('menstrual cramps', 'Ginger Tea', 'Brew fresh ginger root in hot water for 10 minutes and drink 2-3 cups daily during your period. Studies show ginger is as effective as ibuprofen for menstrual pain relief.', 'natural', 'Journal of Pain Research', 2, 8),
('menstrual cramps', 'Light Walking', 'Walk gently for 15-20 minutes. Light exercise increases blood circulation and releases endorphins, which are natural pain relievers. Do not force intense workouts.', 'exercise', 'Journal of Education and Health Promotion', 1, 5),
('menstrual cramps', 'Cinnamon Tea', 'Steep a cinnamon stick or half teaspoon of ground cinnamon in hot water for 10 minutes. Cinnamon has anti-inflammatory, antispasmodic, and analgesic properties.', 'natural', 'Journal of Clinical and Diagnostic Research', 1, 6),
('menstrual cramps', 'Stay Hydrated', 'Drink at least 8-10 glasses of water daily during menstruation. Dehydration worsens bloating and cramping. Warm water is often more soothing than cold.', 'lifestyle', 'BMC Women Health', 1, 7),
('menstrual cramps', 'Reduce Salt and Sugar Intake', 'Excess salt causes water retention and bloating. Excess sugar triggers inflammation. During your period, choose whole foods over processed snacks.', 'dietary', 'Obstetrics & Gynecology Journal', 1, 5),

-- ─────────────────────────────────────────────
-- ALLERGIES
-- ─────────────────────────────────────────────
('allergies', 'Saline Nasal Rinse', 'Use a neti pot or saline spray to flush allergens from nasal passages. Mix quarter teaspoon of non-iodized salt with 1 cup of distilled or boiled (then cooled) water. Do this 1-2 times daily during allergy season.', 'natural', 'American Academy of Allergy, Asthma & Immunology', 1, 7),
('allergies', 'Local Honey', 'Consume 1-2 teaspoons of locally-produced raw honey daily. The theory is that trace amounts of local pollen in the honey can help desensitize your immune system over time.', 'dietary', 'Annals of Saudi Medicine', 1, 5),
('allergies', 'Keep Windows Closed', 'During high pollen seasons, keep windows and doors closed. Use air conditioning if available. Shower and change clothes after spending time outdoors.', 'lifestyle', 'Journal of Allergy and Clinical Immunology', 1, 7),
('allergies', 'Quercetin-Rich Foods', 'Eat onions, apples, berries, green tea, and citrus fruits. Quercetin is a natural antihistamine and anti-inflammatory compound found in many fruits and vegetables.', 'dietary', 'Pharmacognosy Review', 1, 6),
('allergies', 'Steam Inhalation', 'Inhale steam from hot water with a few drops of eucalyptus oil for 10 minutes. Steam clears nasal congestion and the eucalyptus has decongestant properties.', 'natural', 'International Forum of Allergy & Rhinology', 2, 7),
('allergies', 'Clean Living Space', 'Dust surfaces with a damp cloth weekly, vacuum with HEPA filter, wash bedding in hot water weekly, and reduce clutter that collects dust. These reduce indoor allergen exposure significantly.', 'lifestyle', 'Indoor Air Journal', 1, 8),
('allergies', 'Probiotics', 'Eat yogurt, kefir, kimchi, or take probiotic supplements. Gut health influences immune response, and probiotics may help modulate allergic reactions.', 'dietary', 'World Allergy Organization Journal', 1, 5),
('allergies', 'Wear Sunglasses Outdoors', 'Wraparound sunglasses help keep pollen out of your eyes and reduce eye irritation, tearing, and redness during allergy season.', 'lifestyle', 'American College of Allergy, Asthma & Immunology', 1, 5);


-- ============================================
-- PART 2: HEALTH TIPS (100+ entries)
-- ============================================

INSERT INTO public.health_tips (tip_text, category, target_gender, target_age_min, target_age_max, target_location, source) VALUES

-- ─────────────────────────────────────────────
-- NUTRITION (General)
-- ─────────────────────────────────────────────
('Drink at least 2 litres of water daily. In warm climates, you may need 3 litres or more. Carry a reusable water bottle as a reminder.', 'nutrition', NULL, 0, 150, NULL, 'WHO'),
('Eat at least 5 servings of fruits and vegetables every day. A serving is about the size of your fist. Variety in colors means variety in nutrients.', 'nutrition', NULL, 5, 150, NULL, 'WHO'),
('Reduce sugar intake: the WHO recommends less than 25 grams (6 teaspoons) of added sugar per day for adults. Check labels — sugar hides in sauces, bread, and drinks.', 'nutrition', NULL, 18, 150, NULL, 'WHO'),
('Eat more whole grains like brown rice, whole wheat bread, oats, and millet. They are rich in fiber, B vitamins, and minerals. They also keep you fuller for longer.', 'nutrition', NULL, 5, 150, NULL, 'Harvard School of Public Health'),
('Include a source of protein in every meal: eggs, beans, lentils, fish, chicken, or nuts. Protein repairs tissues, builds muscle, and keeps you satisfied between meals.', 'nutrition', NULL, 5, 150, NULL, 'British Nutrition Foundation'),
('Limit processed and ultra-processed foods. They are typically high in salt, sugar, unhealthy fats, and artificial additives. Cook at home whenever possible.', 'nutrition', NULL, 13, 150, NULL, 'BMJ Open'),
('Calcium is essential for strong bones. If you do not consume dairy, get calcium from kale, broccoli, fortified plant milk, sesame seeds, and sardines.', 'nutrition', NULL, 10, 150, NULL, 'National Osteoporosis Foundation'),
('Healthy fats are not your enemy. Avocados, nuts, olive oil, and fatty fish provide essential fatty acids that support brain function and heart health.', 'nutrition', NULL, 13, 150, NULL, 'American Heart Association'),
('Fiber prevents constipation and lowers cholesterol. Get it from fruits, vegetables, legumes, and whole grains. Adults need 25-30 grams of fiber daily.', 'nutrition', NULL, 18, 150, NULL, 'American Dietetic Association'),
('Do not skip breakfast. Studies consistently show that people who eat breakfast have better concentration, more stable energy, and healthier body weight.', 'nutrition', NULL, 5, 150, NULL, 'British Journal of Nutrition'),

-- ─────────────────────────────────────────────
-- NUTRITION (Kenya-specific)
-- ─────────────────────────────────────────────
('Eating local fruits like mangoes, avocados, pawpaw, and passion fruit provides essential vitamins naturally and affordably. Choose seasonal fruits for the best nutrition.', 'nutrition', NULL, 0, 150, 'Kenya', 'FAO'),
('Githeri (maize and beans) is an excellent balanced meal — combining grain and legume provides complete protein with all essential amino acids.', 'nutrition', NULL, 5, 150, 'Kenya', 'Kenya Nutrition Action Plan'),
('Traditional vegetables like managu (African nightshade), saga, terere (amaranth), and mrenda (jute mallow) are among the most nutritious greens in the world. Include them in your diet regularly.', 'nutrition', NULL, 5, 150, 'Kenya', 'Kenya Agricultural Research Institute'),
('Omena (silver cyprinid) is one of the most affordable and nutritious sources of protein, calcium, iron, and omega-3 in East Africa. Just 100g provides significant daily nutritional needs.', 'nutrition', NULL, 5, 150, 'Kenya', 'Journal of Food Composition and Analysis'),
('Iodized salt prevents iodine deficiency and goiter. Always check that your salt is iodized — it costs the same but makes a huge difference in thyroid health.', 'nutrition', NULL, 0, 150, 'Kenya', 'UNICEF Kenya'),
('Porridge made with millet or sorghum flour is more nutritious than refined maize flour porridge. These ancient grains are richer in iron, protein, and B vitamins.', 'nutrition', NULL, 0, 150, 'Kenya', 'Kenya Ministry of Health'),

-- ─────────────────────────────────────────────
-- EXERCISE
-- ─────────────────────────────────────────────
('Walking 30 minutes a day, 5 days a week, can reduce your risk of heart disease by up to 35%. You do not need a gym — brisk walking counts as moderate exercise.', 'exercise', NULL, 18, 150, NULL, 'British Heart Foundation'),
('The WHO recommends at least 150 minutes of moderate exercise or 75 minutes of vigorous exercise per week for adults. That is just 22 minutes of walking per day.', 'exercise', NULL, 18, 150, NULL, 'WHO Physical Activity Guidelines'),
('Strength training 2-3 times per week helps maintain muscle mass, bone density, and metabolism. Use bodyweight exercises like squats, push-ups, and planks — no equipment needed.', 'exercise', NULL, 18, 150, NULL, 'American College of Sports Medicine'),
('Children and adolescents need at least 60 minutes of physical activity every day. This can include running, playing, cycling, swimming, or organized sports.', 'exercise', NULL, 5, 17, NULL, 'WHO'),
('Sitting for more than 8 hours a day without physical activity has health risks comparable to smoking. Stand up and move for 5 minutes every hour.', 'exercise', NULL, 18, 150, NULL, 'The Lancet'),
('Stretching for 10 minutes daily improves flexibility, reduces muscle tension, and prevents injury. Focus on areas that feel tight — hips, hamstrings, shoulders, and back.', 'exercise', NULL, 10, 150, NULL, 'Mayo Clinic'),
('Swimming is one of the best full-body exercises. It is gentle on joints, improves cardiovascular health, and builds endurance. Even 20 minutes of swimming is beneficial.', 'exercise', NULL, 5, 150, NULL, 'Harvard Health Publishing'),
('Exercise improves mental health as much as physical health. Regular physical activity reduces depression symptoms by up to 26% and anxiety by up to 20%.', 'exercise', NULL, 13, 150, NULL, 'The Lancet Psychiatry'),
('You do not need to exercise all at once. Three 10-minute walks throughout the day provide similar benefits to one 30-minute walk.', 'exercise', NULL, 18, 150, NULL, 'American Heart Association'),
('After age 30, adults lose 3-5% of muscle mass per decade. Regular resistance training slows this process and keeps you strong and independent as you age.', 'exercise', NULL, 30, 150, NULL, 'Current Sports Medicine Reports'),

-- ─────────────────────────────────────────────
-- SLEEP
-- ─────────────────────────────────────────────
('Adults need 7-9 hours of sleep per night. Teenagers need 8-10 hours. Children aged 6-12 need 9-12 hours. Chronic sleep deprivation weakens immunity and impairs judgment.', 'sleep', NULL, 5, 150, NULL, 'National Sleep Foundation'),
('Your bedroom should be cool (16-19°C), dark, and quiet for optimal sleep. Even small amounts of light — from a phone charger LED — can disrupt melatonin production.', 'sleep', NULL, 13, 150, NULL, 'Sleep Medicine Reviews'),
('Avoid screens for at least 1 hour before bed. The blue light from phones, tablets, and computers suppresses melatonin by up to 50%, making it harder to fall asleep.', 'sleep', NULL, 10, 150, NULL, 'Proceedings of the National Academy of Sciences'),
('Establish a bedtime routine: dim lights, read a book, do gentle stretches, or listen to calm music. A consistent routine signals your brain that it is time to wind down.', 'sleep', NULL, 5, 150, NULL, 'Sleep Foundation'),
('Caffeine stays in your system for 6-8 hours. That afternoon coffee at 3 PM is still active at 11 PM. Switch to herbal tea after noon if you have trouble sleeping.', 'sleep', NULL, 13, 150, NULL, 'Journal of Clinical Sleep Medicine'),
('Naps should be 20 minutes or less. Longer naps enter deep sleep phases, causing grogginess (sleep inertia) and can interfere with nighttime sleep.', 'sleep', NULL, 18, 150, NULL, 'Sleep Foundation'),
('Irregular sleep schedules (such as sleeping late on weekends) create social jet lag that disrupts your circadian rhythm and metabolism. Consistency matters more than duration.', 'sleep', NULL, 13, 150, NULL, 'Current Biology'),
('Alcohol may help you fall asleep faster but significantly disrupts sleep quality, especially REM sleep. Avoid alcohol within 3 hours of bedtime.', 'sleep', NULL, 18, 150, NULL, 'Alcoholism: Clinical & Experimental Research'),
('If you cannot fall asleep within 20 minutes, get up and do a quiet activity (reading, gentle stretching) until you feel sleepy. Lying in bed awake trains your brain to associate the bed with wakefulness.', 'sleep', NULL, 13, 150, NULL, 'Cognitive Behaviour Therapy Journal'),

-- ─────────────────────────────────────────────
-- MENTAL HEALTH
-- ─────────────────────────────────────────────
('It is okay to not be okay. Mental health challenges are as real and valid as physical ones. Talking about your feelings is a sign of strength, not weakness.', 'mental_health', NULL, 10, 150, NULL, 'WHO Mental Health'),
('Spend at least 20 minutes in nature daily if possible. Studies show that time outdoors reduces cortisol, blood pressure, and anxiety while improving mood and focus.', 'mental_health', NULL, 10, 150, NULL, 'Frontiers in Psychology'),
('Social media use of more than 2 hours per day is linked to increased anxiety and depression, especially in young people. Set screen time limits and curate your feeds.', 'mental_health', NULL, 10, 35, NULL, 'Journal of Social and Clinical Psychology'),
('Practice gratitude: each evening, write down 3 things you are grateful for. This simple habit has been shown to improve mood, sleep quality, and overall well-being.', 'mental_health', NULL, 10, 150, NULL, 'Journal of Personality and Social Psychology'),
('Deep breathing for just 5 minutes can reduce stress hormones by up to 44%. Try the 4-7-8 technique: breathe in for 4 counts, hold for 7, exhale for 8.', 'mental_health', NULL, 10, 150, NULL, 'Harvard Health Publishing'),
('Helping others boosts your own mental health. Volunteering, acts of kindness, and community involvement increase happiness and give a sense of purpose.', 'mental_health', NULL, 13, 150, NULL, 'BMC Public Health'),
('If you are feeling overwhelmed, break tasks into tiny steps. Start with just 5 minutes of effort. Momentum builds once you begin. Perfect is the enemy of done.', 'mental_health', NULL, 13, 150, NULL, 'Cognitive Therapy and Research'),
('Loneliness is a significant health risk — comparable to smoking 15 cigarettes a day. Prioritize regular social contact, even brief check-ins with friends or family.', 'mental_health', NULL, 18, 150, NULL, 'PLOS Medicine'),
('Regular exercise is one of the most effective treatments for mild to moderate depression. Even a 10-minute walk can improve mood for up to 2 hours.', 'mental_health', NULL, 13, 150, NULL, 'British Journal of Sports Medicine'),
('Seek professional help if you experience persistent sadness, loss of interest, changes in sleep or appetite, or difficulty functioning for more than 2 weeks. There is no shame in getting help.', 'mental_health', NULL, 13, 150, NULL, 'American Psychological Association'),

-- ─────────────────────────────────────────────
-- HYGIENE
-- ─────────────────────────────────────────────
('Wash hands with soap for at least 20 seconds — before eating, after using the toilet, after touching animals, and after coughing or sneezing. Proper handwashing prevents 30% of diarrhea-related illnesses.', 'hygiene', NULL, 0, 150, NULL, 'WHO / CDC'),
('Brush teeth twice daily for 2 minutes each time: morning and before bed. Use fluoride toothpaste. Floss at least once daily to prevent gum disease.', 'hygiene', NULL, 3, 150, NULL, 'American Dental Association'),
('Change your toothbrush every 3 months, or sooner if the bristles are frayed. A worn toothbrush is up to 50% less effective at removing plaque.', 'hygiene', NULL, 3, 150, NULL, 'American Dental Association'),
('Wash fruits and vegetables thoroughly under running water before eating, even if you plan to peel them. This removes pesticides, bacteria, and dirt.', 'hygiene', NULL, 0, 150, NULL, 'FDA Food Safety'),
('Keep fingernails short and clean. Long nails harbor bacteria and fungi that can cause infections when you touch your face, food, or wounds.', 'hygiene', NULL, 5, 150, NULL, 'CDC'),
('Change undergarments daily. Wear breathable cotton underwear to prevent fungal infections. Allow shoes to air out between uses.', 'hygiene', NULL, 5, 150, NULL, 'American Academy of Dermatology'),
('Clean your phone screen daily — studies show mobile phones carry 10 times more bacteria than a toilet seat. Use disinfectant wipes or alcohol-based cleaners.', 'hygiene', NULL, 13, 150, NULL, 'University of Arizona Research'),
('Boil drinking water for at least 1 minute (or 3 minutes at high altitude) if you are unsure of its safety. Water-borne diseases like typhoid and cholera are preventable.', 'hygiene', NULL, 0, 150, 'Kenya', 'WHO Water Safety'),
('Wash bed sheets and pillowcases weekly in hot water. Beds accumulate dead skin, sweat, dust mites, and bacteria that can trigger allergies and skin infections.', 'hygiene', NULL, 13, 150, NULL, 'American College of Allergy, Asthma & Immunology'),

-- ─────────────────────────────────────────────
-- GENERAL HEALTH (Women)
-- ─────────────────────────────────────────────
('Iron-rich foods like spinach, beans, lentils, and red meat help prevent anemia. Women who menstruate need approximately 18mg of iron daily — nearly double the male requirement.', 'nutrition', 'female', 13, 50, NULL, 'WHO'),
('Regular breast self-examinations are recommended monthly. Become familiar with how your breasts normally look and feel so you can notice any changes early.', 'general', 'female', 20, 150, NULL, 'Kenya Ministry of Health'),
('Folic acid (400 mcg daily) is essential for all women of childbearing age, even before pregnancy. It prevents serious birth defects of the brain and spine. Found in leafy greens, beans, and fortified cereals.', 'nutrition', 'female', 15, 45, NULL, 'WHO'),
('Cervical cancer is preventable. The HPV vaccine is recommended for girls aged 9-14. Women aged 25-65 should have regular cervical screening (Pap smear or HPV test) every 3-5 years.', 'general', 'female', 9, 65, NULL, 'WHO / Kenya NHIF'),
('Calcium and vitamin D become critically important for women after menopause. Bone density decreases significantly — ensure adequate dairy, leafy greens, or supplements.', 'nutrition', 'female', 45, 150, NULL, 'International Osteoporosis Foundation'),
('Period pain that interferes with daily activities is not normal and should be evaluated by a doctor. Conditions like endometriosis affect 1 in 10 women but are often undiagnosed.', 'general', 'female', 13, 50, NULL, 'WHO / Endometriosis Foundation'),
('Pregnant women should avoid raw or undercooked meat, unpasteurized dairy, and high-mercury fish. Take prenatal vitamins including iron and folic acid as recommended by your healthcare provider.', 'nutrition', 'female', 15, 45, NULL, 'WHO Pregnancy Nutrition'),
('Urinary tract infections (UTIs) are common in women. Drink plenty of water, urinate after sexual intercourse, wipe front to back, and avoid holding urine for long periods.', 'general', 'female', 13, 150, NULL, 'American Urological Association'),

-- ─────────────────────────────────────────────
-- GENERAL HEALTH (Men)
-- ─────────────────────────────────────────────
('Prostate health screening is recommended annually for men over 40, and earlier if there is family history of prostate cancer. Early detection saves lives.', 'general', 'male', 40, 150, NULL, 'Kenya Ministry of Health'),
('Men are statistically less likely to seek medical help than women. Regular health check-ups are not a sign of weakness — they are smart preventive care.', 'general', 'male', 18, 150, NULL, 'American Journal of Men Health'),
('Testicular self-examination should be done monthly. Feel for any lumps, swelling, or changes in size. Testicular cancer is most common in men aged 15-35 and highly treatable when caught early.', 'general', 'male', 15, 45, NULL, 'Urology Care Foundation'),
('Men need approximately 8mg of iron daily. Good sources include red meat, beans, fortified cereals, and spinach. Unlike women, excess iron can be harmful — avoid unnecessary iron supplements.', 'nutrition', 'male', 18, 150, NULL, 'National Institutes of Health'),
('Cardiovascular disease is the leading cause of death in men worldwide. Manage risk by not smoking, exercising regularly, maintaining healthy weight, and controlling blood pressure and cholesterol.', 'general', 'male', 30, 150, NULL, 'American Heart Association'),
('Alcohol consumption should be limited to no more than 2 standard drinks per day. Excessive drinking increases risk of liver disease, heart disease, depression, and accidents.', 'general', 'male', 18, 150, NULL, 'WHO'),

-- ─────────────────────────────────────────────
-- GENERAL HEALTH (Teens & Young Adults)
-- ─────────────────────────────────────────────
('Your brain is still developing until age 25. Protect it: get enough sleep, eat nutritious food, limit alcohol, and avoid drugs. What you do now affects your brain for life.', 'general', NULL, 13, 25, NULL, 'National Institute of Mental Health'),
('Peer pressure is real but manageable. Practice saying "no thanks" beforehand. Surround yourself with friends who respect your choices and support your goals.', 'mental_health', NULL, 13, 22, NULL, 'American Academy of Pediatrics'),
('Acne is common and treatable. Wash your face twice daily with a gentle cleanser, avoid touching your face, and do not pop pimples as this can cause scarring and infection.', 'hygiene', NULL, 10, 25, NULL, 'American Academy of Dermatology'),
('Regular physical activity during adolescence builds stronger bones that last a lifetime. Weight-bearing exercises like running, jumping, and dancing are especially important.', 'exercise', NULL, 10, 20, NULL, 'Bone Research Journal'),
('If you are a student, take breaks every 45-60 minutes while studying. The Pomodoro technique (25 minutes focused work, 5 minutes break) improves retention and reduces fatigue.', 'general', NULL, 10, 30, NULL, 'Journal of Educational Psychology'),

-- ─────────────────────────────────────────────
-- GENERAL HEALTH (Older Adults)
-- ─────────────────────────────────────────────
('Balance exercises like standing on one foot, heel-to-toe walking, and tai chi reduce fall risk by up to 40%. Falls are the leading cause of injury in adults over 65.', 'exercise', NULL, 55, 150, NULL, 'CDC Falls Prevention'),
('Stay socially active. Loneliness in older adults is linked to cognitive decline, depression, and cardiovascular disease. Join community groups, visit friends, or volunteer regularly.', 'mental_health', NULL, 55, 150, NULL, 'National Academies of Sciences'),
('Vitamin D deficiency is very common in older adults. Get 15-20 minutes of sunlight on your skin daily, eat vitamin D-rich foods (fatty fish, eggs), or take a supplement as recommended.', 'nutrition', NULL, 50, 150, NULL, 'Journal of Aging Research'),
('Keep your mind active with puzzles, reading, learning a new skill, or engaging conversations. Mental stimulation builds cognitive reserve and may delay symptoms of dementia.', 'general', NULL, 50, 150, NULL, 'Alzheimer Association'),
('Review your medications regularly with your healthcare provider. As you age, the effects of medications can change. Drug interactions become more common with multiple prescriptions.', 'general', NULL, 55, 150, NULL, 'WHO Medication Safety'),
('Hearing loss affects 1 in 3 people over 65. If you notice difficulty following conversations, ask for a hearing test. Untreated hearing loss is linked to social isolation and cognitive decline.', 'general', NULL, 55, 150, NULL, 'WHO'),

-- ─────────────────────────────────────────────
-- KENYA-SPECIFIC HEALTH
-- ─────────────────────────────────────────────
('Malaria prevention: sleep under insecticide-treated mosquito nets (ITNs), especially during the rainy season. Clear stagnant water near your home where mosquitoes breed.', 'general', NULL, 0, 150, 'Kenya', 'Kenya Ministry of Health / WHO'),
('Typhoid is common in areas with poor water and sanitation. Always drink treated or boiled water, eat well-cooked food, and get vaccinated if available in your area.', 'general', NULL, 0, 150, 'Kenya', 'Kenya Ministry of Health'),
('Kenya NHIF (National Hospital Insurance Fund) covers both inpatient and outpatient services. Register and make regular contributions to protect yourself and your family from catastrophic health costs.', 'general', NULL, 18, 150, 'Kenya', 'NHIF Kenya'),
('HIV testing is free and confidential at all government health facilities in Kenya. Know your status — early detection and treatment with ARVs allows people to live long, healthy lives.', 'general', NULL, 15, 150, 'Kenya', 'NASCOP Kenya'),
('Jigger (Tunga penetrans) infestation is preventable: wear closed shoes, keep floors clean, and seek treatment at a health facility. Do not try to dig them out with unsterilized needles.', 'hygiene', NULL, 0, 150, 'Kenya', 'Kenya Ministry of Health'),
('During hot seasons in arid and semi-arid areas of Kenya, increase water intake and stay in shade during peak hours (10 AM - 4 PM). Heatstroke can be life-threatening.', 'general', NULL, 0, 150, 'Kenya', 'Kenya Meteorological Department'),
('Bilharzia (schistosomiasis) is common near Lake Victoria and other freshwater bodies. Avoid wading or swimming in potentially infected water. Seek treatment if you notice blood in urine.', 'general', NULL, 0, 150, 'Kenya', 'WHO / Kenya Ministry of Health'),
('Community Health Volunteers (CHVs) in your area can provide basic health services, referrals, and health education for free. Contact your nearest health facility to connect with a CHV.', 'general', NULL, 0, 150, 'Kenya', 'Kenya Community Health Strategy'),
('Exclusive breastfeeding for the first 6 months of life is the single most effective intervention to prevent infant mortality. Continue breastfeeding alongside complementary foods until age 2 or beyond.', 'nutrition', 'female', 15, 45, 'Kenya', 'WHO / Kenya Ministry of Health'),
('Mental health services are available at most Level 4 and Level 5 hospitals in Kenya. The Befrienders Kenya helpline (722 178 177) offers free, confidential emotional support.', 'mental_health', NULL, 13, 150, 'Kenya', 'Befrienders Kenya'),

-- ─────────────────────────────────────────────
-- GENERAL WELLNESS
-- ─────────────────────────────────────────────
('Practice the 20-20-20 rule for eye health: every 20 minutes of screen time, look at something 20 feet (6 meters) away for 20 seconds. This prevents digital eye strain.', 'general', NULL, 10, 150, NULL, 'American Academy of Ophthalmology'),
('Laughter truly is medicine. It reduces stress hormones, boosts immune cells, triggers endorphin release, and can temporarily relieve pain. Watch something funny today.', 'general', NULL, 5, 150, NULL, 'Mayo Clinic'),
('Sunscreen with at least SPF 30 should be applied daily, especially between 10 AM and 4 PM. Dark skin still needs sun protection — melanin reduces but does not eliminate UV damage.', 'general', NULL, 10, 150, NULL, 'Skin Cancer Foundation'),
('Smoking is the leading preventable cause of death worldwide. Quitting at any age improves health. After just 1 year, heart disease risk drops by half. It is never too late to quit.', 'general', NULL, 13, 150, NULL, 'WHO'),
('Blood pressure should be checked at least once a year for adults. High blood pressure often has no symptoms but silently damages your heart, brain, and kidneys. Normal is below 120/80 mmHg.', 'general', NULL, 18, 150, NULL, 'American Heart Association'),
('Food poisoning prevention: wash hands before cooking, separate raw meat from other foods, cook to proper temperatures, and refrigerate leftovers within 2 hours. When in doubt, throw it out.', 'hygiene', NULL, 10, 150, NULL, 'WHO Food Safety'),
('Know the warning signs of stroke: Face drooping, Arm weakness, Speech difficulty = Time to call emergency (FAST). Every minute matters — brain tissue dies rapidly during a stroke.', 'general', NULL, 30, 150, NULL, 'American Stroke Association'),
('Regular health check-ups catch problems early when they are most treatable. Adults should have at least one comprehensive check-up per year, including blood pressure, blood sugar, and cholesterol.', 'general', NULL, 18, 150, NULL, 'WHO'),
('Vaccines are one of the most effective health interventions ever developed. Keep your immunizations up to date, including annual flu vaccines and COVID-19 boosters as recommended.', 'general', NULL, 0, 150, NULL, 'WHO'),
('Stay curious and keep learning. Lifelong learning is associated with better cognitive health, greater resilience, and increased life satisfaction at every age.', 'general', NULL, 10, 150, NULL, 'Journal of Happiness Studies'),

-- ─────────────────────────────────────────────
-- CHILDREN (Tips for parents)
-- ─────────────────────────────────────────────
('Children under 5 should have no more than 1 hour of screen time per day. Under 2 years should have zero screen time. Replace with active play and reading together.', 'general', NULL, 0, 5, NULL, 'WHO'),
('Ensure your child completes the full immunization schedule. In Kenya, vaccines are free at government health facilities and protect against 13 preventable diseases.', 'general', NULL, 0, 5, 'Kenya', 'Kenya Expanded Programme on Immunization'),
('Oral rehydration solution (ORS) saves lives during diarrhea. Mix 1 sachet with 1 litre of clean water and give small, frequent sips. Seek medical help if diarrhea lasts more than 3 days.', 'general', NULL, 0, 10, NULL, 'WHO / UNICEF'),
('Children learn healthy habits by watching adults. Model good eating, exercise, handwashing, and sleep habits. What they see you do matters more than what you tell them.', 'general', NULL, 0, 12, NULL, 'American Academy of Pediatrics'),
('Deworming tablets should be given to children every 6 months in areas where worm infections are common. They are free at government health facilities and schools in Kenya.', 'general', NULL, 1, 14, 'Kenya', 'Kenya Ministry of Health'),

-- ─────────────────────────────────────────────
-- FIRST AID AWARENESS
-- ─────────────────────────────────────────────
('For minor burns: run cool (not ice-cold) water over the burn for at least 10 minutes. Do not apply butter, toothpaste, or raw egg — these can cause infection.', 'general', NULL, 10, 150, NULL, 'Red Cross'),
('If someone is choking and cannot cough or speak, stand behind them, place your fist above their navel, and thrust inward and upward (Heimlich maneuver). Call emergency services immediately.', 'general', NULL, 13, 150, NULL, 'Red Cross'),
('For a nosebleed: sit upright (do not tilt your head back), lean slightly forward, and pinch the soft part of your nose for 10-15 minutes. Breathe through your mouth.', 'general', NULL, 5, 150, NULL, 'Mayo Clinic'),
('Keep a basic first aid kit at home: bandages, antiseptic, gauze, adhesive tape, scissors, tweezers, pain reliever, ORS sachets, and a thermometer. Check and restock every 6 months.', 'general', NULL, 18, 150, NULL, 'Red Cross'),
('For a snake bite: keep calm and still, remove jewelry near the bite, keep the affected limb below heart level, and get to a hospital immediately. Do NOT try to suck out venom or apply a tourniquet.', 'general', NULL, 5, 150, 'Kenya', 'WHO Snakebite Management');
