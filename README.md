<div align="center"> <img src="https://img.shields.io/badge/AI%20Model-Google%20Gemini-blue?style=for-the-badge&logo=google" /> <img src="https://img.shields.io/badge/Platform-Google%20AI%20Studio-orange?style=for-the-badge&logo=google" /> <img src="https://img.shields.io/badge/Guidelines-NACO%20STI%2FRTI-green?style=for-the-badge" /> <img src="https://img.shields.io/badge/Developer-Dr.%20Vaishnavi%20K%20R-purple?style=for-the-badge" /> </div>
📌 1. Overview

The Genito-Urinary Clinical Decision Support System (GU-CDSS) is an AI-powered diagnostic assistant designed for frontline healthcare providers.
It uses:

🔹 Google Gemini AI

🔹 PDF-based Knowledge Bank extracted from NACO STI/RTI guidelines

🔹 Syndromic clinical algorithms

🔹 Rule-based logic + AI reasoning

This improves accuracy, triage speed, and standardization in assessing GU symptoms.

🖼️ 2. Application Screenshots
✨ Home / Landing Page
<img src="./screenshots/frontpage.png" width="800"/>
✨ Chat Interface / Clinical Reasoning Flow
<img src="./screenshots/chatpage.png" width="800"/>
🚀 3. How to Run the Demo

The application runs through Google AI Studio App Builder.

Step-by-Step:
Step	Action
1	Open the live app (replace your actual URL below).
2	Select the symptom category.
3	Start the clinical chat.
4	Enter symptoms (examples below).
5	Review the AI-generated diagnosis, red-flags, and management steps.
🌐 Demo URL:

👉 Replace this placeholder with your actual app link
https://aistudio.google.com/app/YOUR_APP_ID

Try These Example Inputs
Case	Input Sample
Female Discharge	“25-year-old female with itching and curdy white discharge.”
Male Burning Urination	“22-year-old male with burning urination and yellow discharge.”
PID Symptoms	“28-year-old female with fever, pelvic pain, and foul-smelling discharge.”
Scrotal Swelling	“30-year-old male with unilateral painful scrotal swelling.”
📂 4. Repository Structure
/
├── algorithms/         → Clinical decision trees (PDFs)
├── knowledge-bank/     → NACO guideline PDFs (P-GU-001 to P-GU-009)
├── screenshots/        → Images displayed in README
└── README.md

📘 5. Knowledge Bank Summary

A structured evidence-based knowledge set derived from Indian National STI/RTI guidelines.

Female Syndromes
Condition	PDF File
Cervicitis	P-GU-001
Dysmenorrhea	P-GU-002
Genital Ulcer Disease	P-GU-003
PID	P-GU-005
Vaginitis	P-GU-009
UTI	P-GU-008
Male Syndromes
Condition	PDF File
Urethritis	P-GU-007
Epididymitis	P-GU-006
Scrotal Swelling	Algorithm Set
Genital Ulcers	P-GU-003
Urinary Symptoms	Algorithm Set
🔀 6. Algorithms Integrated

All clinical pathways are stored under /algorithms.

Included Algorithm Categories
Algorithm	Purpose
Genital Redness / Swelling (M/F)	Differentiation of infection vs trauma vs ulcer
Urinary Symptoms	Polyuria, oliguria, haematuria, dysuria
Scrotal Swelling	Hernia, torsion, epididymitis, hydrocele
Vaginal Bleeding	PMS, DUB, cervical causes
Vaginal Discharge	BV, candidiasis, trichomoniasis
Genital Ulcer Classification	Syphilis, HSV, chancroid, LGV
Inguinal Bubo	LGV vs TB lymphadenitis
Referral Red Flags	Shock, fever, severe pain, pregnancy flags
🏗️ 7. Tech Stack
Component	Details
AI Engine	Google Gemini (Google AI Studio)
UI	Google AI Studio App Builder
Knowledge Base	PDF extraction + structured rule mapping
Language	Natural language for clinical reasoning
Version Control	GitHub
🌱 8. Future Enhancements
Feature	Status
EMR API integration	Planned
QR-code patient entry	Planned
Auto clinical summary generation	Planned
Severity scores	Planned
Voice-enabled input	Planned
Regional language support	Planned
👩‍⚕️ 9. Developer
👤 Dr. Vaishnavi K R

PGDM – Artificial Intelligence & Data Science (Healthcare)
Clinical AI • Digital Health • Medical Informatics

<div align="center">
⭐ If you found this project helpful, please give it a star!

It helps reach more clinicians & developers.

</div>
