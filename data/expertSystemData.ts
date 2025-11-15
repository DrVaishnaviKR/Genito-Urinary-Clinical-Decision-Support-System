import { ExpertSystemData } from '../types';

export const expertSystemData: ExpertSystemData = {
  'START': {
    id: 'START',
    type: 'ASK_CHOICE',
    prompt: 'Welcome to the Genito-Urinary Clinical Decision Support System. Please select the patient\'s gender.',
    options: [
      { text: 'Male', nextStepId: 'MALE_SYMPTOMS' },
      { text: 'Female', nextStepId: 'FEMALE_SYMPTOMS' }
    ]
  },
  // MALE BRANCH
  'MALE_SYMPTOMS': {
    id: 'MALE_SYMPTOMS',
    type: 'ASK_CHOICE',
    prompt: 'What are the primary symptoms?',
    ruleRef: 'IKP-BTP (1-7) #1-3',
    options: [
      { text: 'Redness, swelling, burning of genital area', nextStepId: 'M_RSB_REFERRAL' },
      { text: 'Urine leakage, oliguria, haematuria, polyuria, burning micturition', nextStepId: 'M_UOHP_REFERRAL' },
      { text: 'Scrotal swelling', nextStepId: 'M_SS_REFERRAL' }
    ]
  },
  // MALE PATH 1: Redness, Swelling, Burning
  'M_RSB_REFERRAL': {
    id: 'M_RSB_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any of the following "Associated Referral Signs" present?\n- High grade fever >39.5°C/103°F\n- Hypotension (BP < 90/60)\n- High Heart Rate (>100) or Respiratory Rate (>30)\n- History of Trauma\n- Suspected testicular torsion / bowel obstruction / hernia\n- Severe pain\n- Not responding to treatment',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'M_RSB_SYMPTOM_CHECK'
  },
  'M_RSB_SYMPTOM_CHECK': {
    id: 'M_RSB_SYMPTOM_CHECK',
    type: 'ASK_CHOICE',
    prompt: 'Which symptom is most prominent?',
    options: [
        { text: 'Redness', nextStepId: 'M_RSB_REDNESS' },
        { text: 'Urethral Discharge', nextStepId: 'M_RSB_URETHRAL_DISCHARGE' },
        { text: 'Swelling', nextStepId: 'M_RSB_SWELLING' },
        { text: 'Burning Sensation / Ulcer', nextStepId: 'M_RSB_BURNING_ULCER' }
    ]
  },
  'M_RSB_REDNESS': {
    id: 'M_RSB_REDNESS',
    type: 'ASK_CHOICE',
    prompt: 'Regarding the redness, which description fits best?',
    options: [
      { text: 'Redness without discharge', nextStepId: 'DECISION_BALANITIS' },
      { text: 'Associated with itching, burning, and whitish discharge', nextStepId: 'DECISION_BACTERIAL_INFECTION_M' },
      { text: 'Associated with phimosis, erythema, swelling, macular, popular rash', nextStepId: 'DECISION_FUNGAL_INFECTION_M' }
    ]
  },
  'M_RSB_URETHRAL_DISCHARGE': {
    id: 'M_RSB_URETHRAL_DISCHARGE',
    type: 'DECISION',
    prompt: 'Urethral discharge is noted.',
    diagnosis: 'Probable Gonococcal / Chlamydial Infection',
    info: 'Painful urination with increased frequency is a key indicator.',
    nextStepId: 'END'
  },
  'M_RSB_SWELLING': {
    id: 'M_RSB_SWELLING',
    type: 'ASK_CHOICE',
    prompt: 'Where is the swelling located?',
    options: [
        { text: 'Painful scrotal swelling', nextStepId: 'M_SS_REFERRAL' }, // Jumps to scrotal swelling path
        { text: 'Inguinal swelling', nextStepId: 'M_RSB_INGUINAL_SWELLING' }
    ]
  },
  'M_RSB_INGUINAL_SWELLING': {
    id: 'M_RSB_INGUINAL_SWELLING',
    type: 'ASK_CHOICE',
    prompt: 'Describe the nature of the inguinal swelling and any associated ulcers.',
    options: [
        { text: 'Primary transient genital ulcer; secondary inflamed & enlarged inguinal lymph nodes', nextStepId: 'DECISION_LGV' },
        { text: 'Multiple, painful, non-indurated ulcers with ragged edges and yellowish-grey necrotic floor', nextStepId: 'DECISION_CHANCROID' }
    ]
  },
  'M_RSB_BURNING_ULCER': {
    id: 'M_RSB_BURNING_ULCER',
    type: 'ASK_CHOICE',
    prompt: 'Regarding the genital ulcer, which description fits best?',
     options: [
        { text: 'Single or multiple PAINFUL ulcers', nextStepId: 'DECISION_SYPHILIS' },
        { text: 'Single or multiple PAINLESS ulcers', nextStepId: 'DECISION_SYPHILIS_PAINLESS' },
        { text: 'Painful vesicles with ulcers', nextStepId: 'DECISION_HERPES' }
    ]
  },
  // MALE PATH 2: Urinary Issues
  'M_UOHP_REFERRAL': {
    id: 'M_UOHP_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any "Associated Referral Signs" present?\n- Severe dehydration\n- Hypotension (BP < 90/60)\n- High Heart Rate (>100) or Respiratory Rate (>30)\n- History of Trauma\n- High grade fever >39.5°C\n- Severe pain or bleeding',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'M_UOHP_SYMPTOM_CHECK'
  },
  'M_UOHP_SYMPTOM_CHECK': {
    id: 'M_UOHP_SYMPTOM_CHECK',
    type: 'ASK_CHOICE',
    prompt: 'What is the main urinary symptom?',
    options: [
      { text: 'Urine Leakage', nextStepId: 'M_UOHP_LEAKAGE' },
      { text: 'Urgency to Micturate', nextStepId: 'M_UOHP_URGENCY' },
      { text: 'Oliguria (low urine output)', nextStepId: 'M_UOHP_OLIGURIA' },
      { text: 'Haematuria (blood in urine)', nextStepId: 'M_UOHP_HAEMATURIA' },
      { text: 'Polyuria (frequent urination)', nextStepId: 'M_UOHP_POLYURIA' },
      { text: 'Fever, Chills, Rigor, Burning Micturition', nextStepId: 'DECISION_UTI' }
    ]
  },
  'M_UOHP_LEAKAGE': {
    id: 'M_UOHP_LEAKAGE',
    type: 'ASK_CHOICE',
    prompt: 'When does the urine leakage occur?',
    options: [
      { text: 'During physical activity, coughing', nextStepId: 'DECISION_STRESS_INCONTINENCE' },
      { text: 'Associated with Urgency', nextStepId: 'DECISION_URGE_INCONTINENCE' }
    ]
  },
  'M_UOHP_URGENCY': {
    id: 'M_UOHP_URGENCY',
    type: 'DECISION',
    prompt: 'Difficulty in urination is noted, particularly in elderly males.',
    diagnosis: 'Possible Prostate Carcinoma',
    nextStepId: 'ESCALATE_HIGHER_CENTER'
  },
  'M_UOHP_OLIGURIA': {
    id: 'M_UOHP_OLIGURIA',
    type: 'ASK_CHOICE',
    prompt: 'What was the onset of the oliguria?',
    options: [
      { text: 'Acute onset, history of trauma, dehydration, blood loss, medication history', nextStepId: 'DECISION_AKD' },
      { text: 'Chronic Onset', nextStepId: 'DECISION_CKD' }
    ]
  },
  'M_UOHP_HAEMATURIA': {
    id: 'M_UOHP_HAEMATURIA',
    type: 'ASK_YES_NO',
    prompt: 'Is the haematuria associated with loin pain or backache?',
    yesStepId: 'DECISION_RENAL_CALCULI',
    noStepId: 'M_UOHP_HAEMATURIA_PAINLESS'
  },
  'M_UOHP_HAEMATURIA_PAINLESS': {
    id: 'M_UOHP_HAEMATURIA_PAINLESS',
    type: 'DECISION',
    prompt: 'Painless haematuria is noted, associated with weight loss, fever, or history of carcinoma.',
    diagnosis: 'Possible Carcinoma of Bladder',
    nextStepId: 'ESCALATE_HIGHER_CENTER'
  },
  'M_UOHP_POLYURIA': {
    id: 'M_UOHP_POLYURIA',
    type: 'DECISION',
    prompt: 'Polyuria is associated with polyphagia (increased hunger), polydipsia (increased thirst), and weight loss.',
    diagnosis: 'Possible Diabetes Mellitus',
    info: 'Screening for Diabetes Mellitus is recommended.',
    nextStepId: 'END'
  },
  // MALE PATH 3: Scrotal Swelling
  'M_SS_REFERRAL': {
    id: 'M_SS_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any "Associated Referral Signs" present?\n- Suspected testicular torsion / bowel obstruction / hernia\n- Hypotension (BP < 90/60)\n- High Heart Rate (>100) or Respiratory Rate (>30)\n- History of Trauma\n- High grade fever >39.5°C\n- Severe pain',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'M_SS_PAIN'
  },
  'M_SS_PAIN': {
    id: 'M_SS_PAIN',
    type: 'ASK_YES_NO',
    prompt: 'Is the scrotal swelling painful?',
    yesStepId: 'M_SS_PAINFUL',
    noStepId: 'M_SS_PAINLESS'
  },
  'M_SS_PAINLESS': {
    id: 'M_SS_PAINLESS',
    type: 'ASK_CHOICE',
    prompt: 'Describe the painless swelling.',
    options: [
      { text: 'Painless at rest, but discomfort on bending/coughing. Heavy/dragging sensation. Positive cough impulse.', nextStepId: 'DECISION_HERNIA' },
      { text: 'Translucent, painless, with positive cough impulse.', nextStepId: 'DECISION_TESTICULAR_CARCINOMA' },
      { text: 'Translucent, painless, with negative cough impulse.', nextStepId: 'DECISION_HYDROCELE' }
    ]
  },
  'M_SS_PAINFUL': {
    id: 'M_SS_PAINFUL',
    type: 'ASK_CHOICE',
    prompt: 'Describe the painful swelling.',
    options: [
      { text: 'Low grade fever, chills, heaviness, pain worsens on bowel movements.', nextStepId: 'DECISION_EPIDIDYMITIS' },
      { text: 'Fever, myalgia, facial swelling, cough.', nextStepId: 'DECISION_MUMPS' },
      { text: 'History of trauma, sudden severe testicular pain, lower abdominal tenderness.', nextStepId: 'DECISION_TESTICULAR_TRAUMA' },
      { text: 'History of hernia, nausea, vomiting, fever. Sudden intense pain, bulge turns reddish/purple. Positive cough impulse.', nextStepId: 'DECISION_STRANGULATED_HERNIA' }
    ]
  },
  // FEMALE BRANCH
  'FEMALE_SYMPTOMS': {
    id: 'FEMALE_SYMPTOMS',
    type: 'ASK_CHOICE',
    prompt: 'What are the primary symptoms?',
    ruleRef: 'IKP-BTP (1-7) #4-7',
    options: [
      { text: 'Swelling, burning of genital area', nextStepId: 'F_SB_REFERRAL' },
      { text: 'Urine leakage, oliguria, haematuria, polyuria, burning micturition', nextStepId: 'F_UOHP_REFERRAL' },
      { text: 'Vaginal bleeding', nextStepId: 'F_VB_REFERRAL' },
      { text: 'Vaginal discharge', nextStepId: 'F_VD_REFERRAL' }
    ]
  },
  // FEMALE PATH 1: Swelling, Burning
  'F_SB_REFERRAL': {
    id: 'F_SB_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any "Associated Referral Signs" present?\n- Pregnancy\n- Hypotension (BP < 90/60)\n- High Heart Rate (>100) or Respiratory Rate (>30)\n- Severe Bleeding',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'F_SB_SYMPTOM_CHECK'
  },
  'F_SB_SYMPTOM_CHECK': {
    id: 'F_SB_SYMPTOM_CHECK',
    type: 'ASK_CHOICE',
    prompt: 'Which symptom is most prominent?',
    options: [
      { text: 'Swelling in the Inguinal Area', nextStepId: 'F_SB_INGUINAL_SWELLING' },
      { text: 'Burning Sensation in Genital Area / Genital Ulcer', nextStepId: 'F_SB_BURNING_ULCER' }
    ]
  },
  'F_SB_INGUINAL_SWELLING': {
    id: 'F_SB_INGUINAL_SWELLING',
    type: 'ASK_CHOICE',
    prompt: 'Describe the nature of the inguinal swelling and any associated ulcers.',
    options: [
        { text: 'Primary transient genital ulcer; secondary inflamed & enlarged inguinal lymph nodes', nextStepId: 'DECISION_LGV' },
        { text: 'Multiple, painful, non-indurated ulcers with ragged edges and yellowish-grey necrotic floor', nextStepId: 'DECISION_CHANCROID' }
    ]
  },
  'F_SB_BURNING_ULCER': {
    id: 'F_SB_BURNING_ULCER',
    type: 'ASK_CHOICE',
    prompt: 'Regarding the genital ulcer, which description fits best?',
     options: [
        { text: 'Single or multiple PAINFUL ulcer', nextStepId: 'DECISION_SYPHILIS' },
        { text: 'Single or multiple PAINLESS ulcer', nextStepId: 'DECISION_SYPHILIS_PAINLESS' },
        { text: 'Painful vesicles with ulcers', nextStepId: 'DECISION_HERPES' }
    ]
  },
  // FEMALE PATH 2: Urinary Issues
  'F_UOHP_REFERRAL': {
    id: 'F_UOHP_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any "Associated Referral Signs" present?\n- Severe dehydration\n- High grade fever >39.5°C\n- Pregnancy\n- Hypotension (BP < 90/60)\n- HR>100,RR>30\n- Severe bleeding/pain\n- H/o Trauma\n- H/o Anuria, oliguria\n- Not responding to treatment',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'F_UOHP_SYMPTOM_CHECK'
  },
   'F_UOHP_SYMPTOM_CHECK': {
    id: 'F_UOHP_SYMPTOM_CHECK',
    type: 'ASK_CHOICE',
    prompt: 'What is the main urinary symptom?',
    options: [
      { text: 'Urine Leakage', nextStepId: 'F_UOHP_LEAKAGE' },
      { text: 'Urgency to Micturate', nextStepId: 'F_UOHP_URGENCY' },
      { text: 'Oliguria (low urine output)', nextStepId: 'F_UOHP_OLIGURIA' },
      { text: 'Haematuria (blood in urine)', nextStepId: 'F_UOHP_HAEMATURIA' },
      { text: 'Polyuria (frequent urination)', nextStepId: 'F_UOHP_POLYURIA' },
      { text: 'Fever, Chills, Rigor, Burning Micturition', nextStepId: 'DECISION_UTI' }
    ]
  },
  'F_UOHP_LEAKAGE': {
    id: 'F_UOHP_LEAKAGE',
    type: 'ASK_CHOICE',
    prompt: 'When does the urine leakage occur?',
    options: [
      { text: 'During physical activity, coughing', nextStepId: 'DECISION_STRESS_INCONTINENCE' },
      { text: 'Associated with Urgency', nextStepId: 'DECISION_URGE_INCONTINENCE' }
    ]
  },
   'F_UOHP_URGENCY': {
    id: 'F_UOHP_URGENCY',
    type: 'DECISION',
    prompt: 'Difficulty in urination is noted.',
    diagnosis: 'Possible Prolapse of Uterus',
    nextStepId: 'ESCALATE_HIGHER_CENTER'
  },
  'F_UOHP_OLIGURIA': {
    id: 'F_UOHP_OLIGURIA',
    type: 'ASK_CHOICE',
    prompt: 'What was the onset of the oliguria?',
    options: [
      { text: 'Acute onset, history of trauma, dehydration, blood loss, medication history', nextStepId: 'DECISION_AKD' },
      { text: 'Chronic Onset', nextStepId: 'DECISION_CKD' }
    ]
  },
  'F_UOHP_HAEMATURIA': {
    id: 'F_UOHP_HAEMATURIA',
    type: 'ASK_YES_NO',
    prompt: 'Is the haematuria associated with loin pain or backache?',
    yesStepId: 'DECISION_RENAL_CALCULI',
    noStepId: 'F_UOHP_HAEMATURIA_PAINLESS'
  },
  'F_UOHP_HAEMATURIA_PAINLESS': {
    id: 'F_UOHP_HAEMATURIA_PAINLESS',
    type: 'DECISION',
    prompt: 'Painless haematuria is noted, associated with weight loss, fever, or history of carcinoma.',
    diagnosis: 'Possible Carcinoma of Bladder',
    nextStepId: 'ESCALATE_HIGHER_CENTER'
  },
  'F_UOHP_POLYURIA': {
    id: 'F_UOHP_POLYURIA',
    type: 'DECISION',
    prompt: 'Polyuria is associated with polyphagia (increased hunger), polydipsia (increased thirst), and weight loss.',
    diagnosis: 'Possible Diabetes Mellitus',
    info: 'Screening for Diabetes Mellitus is recommended.',
    nextStepId: 'END'
  },
  // FEMALE PATH 3: Vaginal Bleeding
  'F_VB_REFERRAL': {
    id: 'F_VB_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any "Associated Referral Signs" present?\n- H/o Abuse\n- High grade fever >39.5°C\n- Pregnancy\n- Hypotension (BP < 90/60)\n- HR>100,RR>30\n- Severe bleeding/pain\n- H/o Trauma\n- Not responding to treatment',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'F_VB_TYPE'
  },
  'F_VB_TYPE': {
      id: 'F_VB_TYPE',
      type: 'ASK_CHOICE',
      prompt: 'Is the bleeding consistent with normal menstruation (4-6 days, 10-35ml blood loss)?',
      options: [
          { text: 'Yes, it is normal menstruation', nextStepId: 'F_VB_NORMAL_MENSTRUATION' },
          { text: 'No, it is abnormal bleeding', nextStepId: 'F_VB_ABNORMAL_BLEEDING' }
      ]
  },
  'F_VB_NORMAL_MENSTRUATION': {
      id: 'F_VB_NORMAL_MENSTRUATION',
      type: 'ASK_CHOICE',
      prompt: 'Is the menstruation associated with pain?',
      options: [
          { text: 'Associated with supra pubic pain, cramps before or during menses', nextStepId: 'DECISION_PMS'},
          { text: 'Associated with HEAVY bleeding, supra pubic pain, cramps, dyspareunia, dyschezia', nextStepId: 'DECISION_PRIMARY_DYSMENORRHOEA'}
      ]
  },
  'F_VB_ABNORMAL_BLEEDING': {
    id: 'F_VB_ABNORMAL_BLEEDING',
    type: 'ASK_CHOICE',
    prompt: 'When does the abnormal bleeding occur?',
    options: [
      { text: 'Post Menopausal', nextStepId: 'DECISION_POST_MENOPAUSAL_BLEEDING' },
      { text: 'Post Coital (after intercourse)', nextStepId: 'DECISION_POST_COITAL_BLEEDING' },
      { text: 'Pre Menopausal', nextStepId: 'DECISION_DYSFUNCTIONAL_UTERINE_BLEEDING' },
      { text: 'In young patients (Rule out pregnancy/miscarriage)', nextStepId: 'F_VB_YOUNG_PATIENTS' }
    ]
  },
   'F_VB_YOUNG_PATIENTS': {
      id: 'F_VB_YOUNG_PATIENTS',
      type: 'ASK_CHOICE',
      prompt: 'Is there a history of IUD use or bleeding from gums/petechia?',
      options: [
          { text: 'Intra Uterine device use (IUD)', nextStepId: 'ESCALATE_HIGHER_CENTER' },
          { text: 'Bleeding from Gingiva, Petechia', nextStepId: 'DECISION_BLEEDING_DISORDERS' }
      ]
  },
  // FEMALE PATH 4: Vaginal Discharge
  'F_VD_REFERRAL': {
    id: 'F_VD_REFERRAL',
    type: 'ASK_YES_NO',
    prompt: 'Are any "Associated Referral Signs" present?\n- History of Abuse\n- High grade fever >39.5°C\n- Pregnancy\n- Hypotension (BP < 90/60)\n- HR>100,RR>30\n- Severe bleeding / pain\n- H/o Trauma\n- Not responding to treatment',
    yesStepId: 'ESCALATE_IMMEDIATE',
    noStepId: 'F_VD_CHARACTER'
  },
  'F_VD_CHARACTER': {
    id: 'F_VD_CHARACTER',
    type: 'ASK_CHOICE',
    prompt: 'Please describe the vaginal discharge.',
    options: [
      { text: 'White or clear non-offensive, varies with menstrual cycle', nextStepId: 'DECISION_NORMAL_PHYSIOLOGICAL_DISCHARGE' },
      { text: 'Associated with fever, abnormal vaginal bleeding, dysmenorrhoea, dysuria, history of IUCD', nextStepId: 'DECISION_PID' },
      { text: 'Associated with vaginal bleeding (e.g., between periods, after intercourse, after menopause), weight loss', nextStepId: 'DECISION_CERVICAL_CANCER_SCREENING' },
      { text: 'Profuse, malodorous, frothy, yellowish-green colored', nextStepId: 'DECISION_TRICHOMONIASIS' },
      { text: 'Excessive, homogenous, uniformly adherent, fishy odour, grey colored', nextStepId: 'DECISION_BACTERIAL_VAGINITIS' },
      { text: 'Oedema, fissures, erosions, curdy white discharge', nextStepId: 'DECISION_CANDIDIASIS' },
      { text: 'Discharge from cervix confirmed with speculum examination', nextStepId: 'DECISION_CERVICITIS' },
    ]
  },
  // DECISION & ESCALATION NODES
  'ESCALATE_IMMEDIATE': {
    id: 'ESCALATE_IMMEDIATE',
    type: 'ESCALATE',
    prompt: 'Critical referral signs detected.',
    info: 'REFER IMMEDIATELY. This patient requires urgent medical attention.',
    nextStepId: 'END'
  },
  'ESCALATE_HIGHER_CENTER': {
    id: 'ESCALATE_HIGHER_CENTER',
    type: 'ESCALATE',
    prompt: 'Condition requires further investigation.',
    info: 'REFER TO HIGHER CENTER. This patient requires specialist evaluation.',
    nextStepId: 'END'
  },
  'DECISION_BALANITIS': { id: 'DECISION_BALANITIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Balanitis', nextStepId: 'END' },
  'DECISION_BACTERIAL_INFECTION_M': { id: 'DECISION_BACTERIAL_INFECTION_M', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Bacterial Infection', nextStepId: 'END' },
  'DECISION_FUNGAL_INFECTION_M': { id: 'DECISION_FUNGAL_INFECTION_M', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Fungal Infection', nextStepId: 'END' },
  'DECISION_LGV': { id: 'DECISION_LGV', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Lymphogranuloma Venereum (LGV)', info: 'Reference P-GU-004', nextStepId: 'END' },
  'DECISION_CHANCROID': { id: 'DECISION_CHANCROID', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Chancroid', nextStepId: 'END' },
  'DECISION_SYPHILIS': { id: 'DECISION_SYPHILIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Syphilis (Painful Ulcer Presentation)', info: 'Reference P-GU-003', nextStepId: 'END' },
  'DECISION_SYPHILIS_PAINLESS': { id: 'DECISION_SYPHILIS_PAINLESS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Syphilis (Painless Ulcer Presentation)', info: 'Reference P-GU-003', nextStepId: 'END' },
  'DECISION_HERPES': { id: 'DECISION_HERPES', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Herpes', info: 'Reference P-GU-003', nextStepId: 'END' },
  'DECISION_STRESS_INCONTINENCE': { id: 'DECISION_STRESS_INCONTINENCE', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Stress Incontinence', nextStepId: 'END' },
  'DECISION_URGE_INCONTINENCE': { id: 'DECISION_URGE_INCONTINENCE', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Urge Incontinence', nextStepId: 'END' },
  'DECISION_AKD': { id: 'DECISION_AKD', type: 'DECISION', prompt: 'Condition requires further investigation.', diagnosis: 'Acute Kidney Disease', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_CKD': { id: 'DECISION_CKD', type: 'DECISION', prompt: 'Condition requires further investigation.', diagnosis: 'Chronic Kidney Disease', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_RENAL_CALCULI': { id: 'DECISION_RENAL_CALCULI', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Renal Calculi', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_UTI': { id: 'DECISION_UTI', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Urinary Tract Infection', info: 'Reference P-GU-008', nextStepId: 'END' },
  'DECISION_HERNIA': { id: 'DECISION_HERNIA', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Hernia', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_TESTICULAR_CARCINOMA': { id: 'DECISION_TESTICULAR_CARCINOMA', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Testicular Carcinoma (probably)', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_HYDROCELE': { id: 'DECISION_HYDROCELE', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Hydrocele', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_EPIDIDYMITIS': { id: 'DECISION_EPIDIDYMITIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Epididymitis', info: 'Reference P-GU-006', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_MUMPS': { id: 'DECISION_MUMPS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Mumps', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_TESTICULAR_TRAUMA': { id: 'DECISION_TESTICULAR_TRAUMA', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Testicular Trauma/Torsion', nextStepId: 'ESCALATE_IMMEDIATE' },
  'DECISION_STRANGULATED_HERNIA': { id: 'DECISION_STRANGULATED_HERNIA', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Incarcerated / Strangulated Inguinal Hernia', nextStepId: 'ESCALATE_IMMEDIATE' },
  'DECISION_PMS': { id: 'DECISION_PMS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Pre Menstrual Syndrome (PMS)', nextStepId: 'END' },
  'DECISION_PRIMARY_DYSMENORRHOEA': { id: 'DECISION_PRIMARY_DYSMENORRHOEA', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Primary Dysmenorrhoea', info: 'Reference P-GU-002', nextStepId: 'END' },
  'DECISION_POST_MENOPAUSAL_BLEEDING': { id: 'DECISION_POST_MENOPAUSAL_BLEEDING', type: 'DECISION', prompt: 'This requires further investigation.', diagnosis: 'Post Menopausal Bleeding', info: 'Rule out Sexually transmitted infections. Consider Cervical Cancer Screening.', nextStepId: 'ESCALATE_HIGHER_CENTER'},
  'DECISION_POST_COITAL_BLEEDING': { id: 'DECISION_POST_COITAL_BLEEDING', type: 'DECISION', prompt: 'This requires further investigation.', diagnosis: 'Post Coital Bleeding', info: 'Rule out Sexually transmitted infections. Action: Cervical Cancer Screening.', nextStepId: 'ESCALATE_HIGHER_CENTER'},
  'DECISION_DYSFUNCTIONAL_UTERINE_BLEEDING': { id: 'DECISION_DYSFUNCTIONAL_UTERINE_BLEEDING', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Dysfunctional Uterine Bleeding', nextStepId: 'ESCALATE_HIGHER_CENTER'},
  'DECISION_BLEEDING_DISORDERS': { id: 'DECISION_BLEEDING_DISORDERS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Bleeding Disorders', nextStepId: 'ESCALATE_HIGHER_CENTER'},
  'DECISION_NORMAL_PHYSIOLOGICAL_DISCHARGE': { id: 'DECISION_NORMAL_PHYSIOLOGICAL_DISCHARGE', type: 'DECISION', prompt: 'This appears to be normal.', diagnosis: 'Normal Physiological Discharge', info: 'Provide emotional reassurance.', nextStepId: 'END' },
  'DECISION_PID': { id: 'DECISION_PID', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Pelvic Inflammatory Disease', info: 'Reference P-GU-005', nextStepId: 'END' },
  'DECISION_CERVICAL_CANCER_SCREENING': { id: 'DECISION_CERVICAL_CANCER_SCREENING', type: 'DECISION', prompt: 'This requires further investigation.', diagnosis: 'Possible Cervical Cancer', info: 'Action: Cervical Cancer Screening.', nextStepId: 'ESCALATE_HIGHER_CENTER' },
  'DECISION_TRICHOMONIASIS': { id: 'DECISION_TRICHOMONIASIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Trichomoniasis', nextStepId: 'END' },
  'DECISION_BACTERIAL_VAGINITIS': { id: 'DECISION_BACTERIAL_VAGINITIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Bacterial Vaginitis', info: 'Reference P-GU-009', nextStepId: 'END' },
  'DECISION_CANDIDIASIS': { id: 'DECISION_CANDIDIASIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Candidiasis', info: 'Reference P-GU-009', nextStepId: 'END' },
  'DECISION_CERVICITIS': { id: 'DECISION_CERVICITIS', type: 'DECISION', prompt: 'Potential diagnosis based on symptoms.', diagnosis: 'Cervicitis', info: 'Reference P-GU-001', nextStepId: 'END' },
  'END': {
    id: 'END',
    type: 'ASK_CHOICE',
    prompt: 'The diagnostic process is complete.',
    options: [
      { text: 'Start New Session', nextStepId: 'START' }
    ]
  }
};