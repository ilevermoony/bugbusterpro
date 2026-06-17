
You are designing a mobile app called BugBuster Pro — a pest control service app for Android and iOS. Follow this design system strictly for every screen.
Frame size: 390x844px (iPhone 14 standard)
Color Palette:
Primary: #1A73E8 (blue — buttons, icons, active states)
Primary Dark: #1557B0 (hover/pressed states)
Primary Light: #E8F0FE (blue tint — backgrounds, selected states)
Accent: #FF6B2B (orange — CTAs, highlights, badges)
Success: #34A853 (green — "Done", "Paid" status)
Warning: #FBBC04 (yellow — "Process", "Pending" status)
Danger: #EA4335 (red — errors, "Cancel", logout button border)
Background: #FFFFFF (main screens)
Surface: #F8F9FA (cards, input fields)
Border: #E0E0E0 (dividers, input borders)
Text Primary: #1A1A2E (headings, body)
Text Secondary: #6B7280 (subtitles, placeholders, captions)
Text On Primary: #FFFFFF (text on blue/orange buttons)
Typography:
Font: Inter (or SF Pro for iOS feel)
H1: 24px, weight 700, color #1A1A2E
H2: 20px, weight 600, color #1A1A2E
H3: 16px, weight 600, color #1A1A2E
Body: 14px, weight 400, color #1A1A2E
Caption: 12px, weight 400, color #6B7280
Button text: 14px, weight 600, color #FFFFFF
Spacing & Layout:
Screen horizontal padding: 20px
Card padding: 16px
Gap between elements: 12px
Gap between sections: 24px
Bottom navigation height: 64px
Border Radius:
Buttons (full width): 12px
Cards: 16px
Input fields: 10px
Chips/badges: 20px (pill shape)
Service icon cards: 16px
Shadows:
Cards: box-shadow 0px 2px 8px rgba(0,0,0,0.08)
Bottom nav: box-shadow 0px -1px 8px rgba(0,0,0,0.06)
Components:
Primary Button: full width, height 52px, background #1A73E8, border-radius 12px, text white 14px semibold
Secondary Button: full width, height 52px, background white, border 1.5px #1A73E8, text #1A73E8
Danger Button (outline): border 1.5px #EA4335, text #EA4335 (used for Logout)
Input Field: background #F8F9FA, border 1px #E0E0E0, height 52px, border-radius 10px, left icon in #6B7280, placeholder text #6B7280
Status Badge "Paid": background #E6F4EA, text #34A853, pill shape
Status Badge "Process": background #FEF9E7, text #FBBC04, pill shape
Status Badge "Done": background #E6F4EA, text #34A853, pill shape
Status Badge "Cancelled": background #FCE8E6, text #EA4335, pill shape
Bottom Navigation: white background, 4 icons, active icon color #1A73E8, inactive #6B7280, active tab has blue dot indicator below icon
Service Card: background white, border-radius 16px, shadow, icon on top (blue tinted background circle), service name #1A73E8 semibold below, caption #6B7280 below name
Icons: Use outline style icons only (Feather Icons or Material Symbols Outlined)
Overall style: Clean, modern, trustworthy, friendly. Lots of white space. Blue as dominant brand color. No dark backgrounds except on splash screen variant.

SPLASH SCREEN
Using the design system above, create a splash screen. Screen 1: white background, BugBuster Pro logo (blue circle with white shield + bug outline icon) centered vertically, app name "BugBuster Pro" in H1 below logo, tagline "Your Trusted Pest Control Partner" in caption gray below. Screen 2: full blue (#1A73E8) background, same logo but white version centered, app name in white H1.

LOGIN & SIGN UP
Using the design system above, create a Login screen and a Sign Up screen side by side. Login: logo at top center, "Login" H2 title, email input with envelope icon, password input with lock icon and eye toggle, "Forgot Password?" right-aligned caption in #1A73E8, primary blue Login button, bottom caption "By logging in you agree to our Terms and Conditions and Privacy Policy" with links in blue. Sign Up: same layout, add full name input with person icon above email, remove forgot password link, change button to "Sign Up". Also create a Login Error state: password field border turns #EA4335, error message "Password anda salah, silahkan ulangi!" in #EA4335 below the password field.

CUSTOMER HOME SCREEN
Using the design system above, create a Customer Home Screen. Top: greeting text "Good Morning," in caption gray + "Alexander" in H2 bold, profile photo circle top right (40x40px). Section label "Our Services" in H3. Below: 2-column grid of 6 service cards (Mosquito, Rat, Bedbug, Flea, Termite, Aphid). Each card: white background, 16px radius, shadow, blue tinted circle icon top, service name in #1A73E8 semibold, 2-line danger description in caption gray. Bottom navigation: Home (active, blue dot), Services, History, Profile icons.

DETAIL SERVICE & BOOKING FORM
Using the design system above, create a Detail Service screen and a Booking Form screen. Detail Service: back arrow header "< Termites Service", scrollable content showing numbered service list (1. Termite Inspection, 2. Termite Treatment, etc.) each with bullet points, sticky bottom "Book Now" primary button. Booking Form: back arrow header "< Booking Service", labeled input fields (Add Name, Add Phone Number, Add Address, Add E-mail), "When do you want the service?" section with horizontal date chips (Today 21, Tomorrow 22, Wed 23, Thu 24) — selected date in blue filled chip, "Select Pick-up Time Slot" grid of 30-min slots (8:00-8:30am, 8:30-9:00am, etc.) — selected slot in blue filled chip, others in gray outline. Sticky bottom bar: service name + price left, "Book" blue button right.

PAYMENT PAGE
Using the design system above, create a Payment screen and a Payment Success screen. Payment: back arrow header "< Payment", rows for "Service Total Rp. 180.000", "Convenience Charges Rp. 2.000", bold "Service Amount Payable Rp. 182.000", coupon code input with "APPLY" blue text button right, "Amount Payable Rp. 182.000" bold, "Pay Using" section with radio button options (PayTM logo, G Pay logo, Visa/Debit card logo, cash icon "Pay after the service") — last option selected with blue radio. Sticky bottom: service name + amount left, "Pay" blue button right. Payment Success: centered layout, "Order was placed Successfully!" in H2 #1A73E8, large blue circle with white checkmark icon, description text in gray, "Back to Home" primary blue button.

CUSTOMER PROFILE
Using the design system above, create a Customer Profile screen and a Detail Profil screen. Profile: circular profile photo (80x80px) centered top, name "Alexander" in H2, username "User123" in caption gray, menu list items with right chevrons (Detail Profil, Booking Information, Technician Assignment Details, Service Completion Report, Feedback Request), red outline "Logout" button at bottom, bottom navigation. Detail Profil: back arrow header "< Detail Profil", labeled input fields (Your Email, Phone Number, Password with eye toggle).

TECHNICIAN SCREENS
Using the design system above, create 3 Technician screens. Technician Profile: same layout as customer profile but role label "Technician" below name, menu items (Detail Profil, Daily Schedule, Customer Details and Address, Service History for the Customer, Navigation to Service Location), logout button. Technician Profile Detail: back arrow "< Detail Profil", profile photo, name + Technician label, fields (Your Email, Technician ID with ID card icon, Phone Number, Password). Technician Home: same as customer home but greeting "Good Morning, Alexander" and service grid shows termite-specific services (Termites, Weevil, Mosquito, Rat, Bedbug, Aphid).

SERVICE MANAGEMENT (TECHNICIAN)
Using the design system above, create a Service List screen and an Update Status screen. Service List (e.g. "< Weevil Service"): scrollable list of customer cards — each card shows customer name bold, date caption, time caption, "Paid" green badge top right, blue "Update Status" full-width button below. Update Status screen "< Alexander": "Add Status" label + dropdown selector "Completion Status", "Service Report" label + large multiline text area "Add Description...", "Feedback Form" label + large multiline text area, "Follow Up Date" label + date picker input with calendar icon, "Save Update" primary blue button at bottom.

SERVICE HISTORY
Using the design system above, create a Service History screen. Back arrow header "< Service History". Scrollable list of past service cards — each card: customer name bold, date caption, time caption, status badge (green "Done" or yellow "Process"), blue "Update Status" button below each card.

ADMIN DASHBOARD
Using the design system above, create an Admin Dashboard screen. Top greeting + profile photo. Three summary metric cards in a row: "Total Bookings" with number, "Active Technicians" with number, "Avg Rating" with star icon — each card white with shadow. Below: a simple bar chart "Weekly Bookings" in blue bars. Below: "Recent Bookings" section as a list — each row shows customer name, service type, technician assigned, status badge. Bottom navigation for admin: Dashboard, Technicians, Bookings, Reports.


