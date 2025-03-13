export interface PoliceCode {
  CODE: string;
  DESCRIPTION: string;
}

export type PoliceCodesData = Record<string, PoliceCode[]>;

export const policeCodes: PoliceCodesData = {
  "RESULT CODES": [
    {
      CODE: "K1",
      DESCRIPTION: "No further police action required",
    },
    {
      CODE: "K2",
      DESCRIPTION: "Event held until later",
    },
    {
      CODE: "K3",
      DESCRIPTION:
        "No offence disclosed (for incident initially reported as offences)",
    },
    {
      CODE: "K4",
      DESCRIPTION: "Warning given-Now included in K6",
    },
    {
      CODE: "K5",
      DESCRIPTION: "Police form 258 or 101 submitted-Now included in K6",
    },
    {
      CODE: "K6",
      DESCRIPTION: "Reported",
    },
    {
      CODE: "K7",
      DESCRIPTION: "Job left for expert",
    },
    {
      CODE: "K8",
      DESCRIPTION: "Job left for prime unit",
    },
    {
      CODE: "K9",
      DESCRIPTION: "Arrest made",
    },
  ],
  "STATUS CODES": [
    {
      CODE: "10-0",
      DESCRIPTION: "Off duty",
    },
    {
      CODE: "10-1",
      DESCRIPTION: "Broadcast to all units",
    },
    {
      CODE: "10-2",
      DESCRIPTION: "En-route to job",
    },
    {
      CODE: "10-3",
      DESCRIPTION: "Available",
    },
    {
      CODE: "10-4",
      DESCRIPTION: "Repeat your last message",
    },
    {
      CODE: "10-5",
      DESCRIPTION: "Out of service for a short time (now obsolete)",
    },
    {
      CODE: "10-6",
      DESCRIPTION: "Change channel",
    },
    {
      CODE: "10-7",
      DESCRIPTION: "Arrived at job",
    },
    {
      CODE: "10-8",
      DESCRIPTION: "Busy but available",
    },
    {
      CODE: "10-9",
      DESCRIPTION: "Urgent Message",
    },
    {
      CODE: "10-10",
      DESCRIPTION: "Officer requires immediate assistance",
    },
  ],
  "INCIDENT CODES": [
    {
      CODE: "1A",
      DESCRIPTION: "Alarm Sounding",
    },
    {
      CODE: "1B",
      DESCRIPTION: "Bomb Threat",
    },
    {
      CODE: "1C",
      DESCRIPTION: "Car/Person Acting Suspiciously",
    },
    {
      CODE: "1D",
      DESCRIPTION: "Domestic Dispute",
    },
    {
      CODE: "1E",
      DESCRIPTION: "Emergency/Disaster/Spill",
    },
    {
      CODE: "1F",
      DESCRIPTION: "Assist Fire/Ambulance",
    },
    {
      CODE: "1G",
      DESCRIPTION: "Solvent Abuse",
    },
    {
      CODE: "1H",
      DESCRIPTION: "Drunk Home",
    },
    {
      CODE: "1L",
      DESCRIPTION: "Blockage/Breakdown on Highway",
    },
    {
      CODE: "1J",
      DESCRIPTION: "Juvenile Complaint",
    },
    {
      CODE: "1K",
      DESCRIPTION: "Drunk Custody/Detox Centre",
    },
    {
      CODE: "1L",
      DESCRIPTION: "Land Rescue",
    },
    {
      CODE: "1M",
      DESCRIPTION: "Mental",
    },
    {
      CODE: "1N",
      DESCRIPTION: "Noise Control",
    },
    {
      CODE: "1P",
      DESCRIPTION: "Premises Insecure",
    },
    {
      CODE: "1Q",
      DESCRIPTION: "Breach Graduated Drivers Licence",
    },
    {
      CODE: "1R",
      DESCRIPTION: "Breach of the Peace",
    },
    {
      CODE: "1S",
      DESCRIPTION: "Sudden Death",
    },
    {
      CODE: "1T",
      DESCRIPTION: "Truancy",
    },
    {
      CODE: "1U",
      DESCRIPTION: "Traffic Incident",
    },
    {
      CODE: "1V",
      DESCRIPTION: "Vehicle Collision",
    },
    {
      CODE: "1W",
      DESCRIPTION: "Water/Sea Rescue/Emergency",
    },
    {
      CODE: "1X",
      DESCRIPTION: "Attempted Suicide",
    },
    {
      CODE: "1Z",
      DESCRIPTION: "Other Incident",
    },
  ],
  "SERVICES CODES": [
    {
      CODE: "2A",
      DESCRIPTION: "Advise Relatives/Owner",
    },
    {
      CODE: "2B",
      DESCRIPTION: "Recruiting",
    },
    {
      CODE: "2C",
      DESCRIPTION: "Civil Dispute",
    },
    {
      CODE: "2D",
      DESCRIPTION: "Official Request for Information",
    },
    {
      CODE: "2E",
      DESCRIPTION: "Remove fences/structures/vegetation",
    },
    {
      CODE: "2F",
      DESCRIPTION: "Firearms Licensing",
    },
    {
      CODE: "2G",
      DESCRIPTION: "Liquor Licensing/Vetting",
    },
    {
      CODE: "2H",
      DESCRIPTION: "Draw Raffle",
    },
    {
      CODE: "2I",
      DESCRIPTION: "Information",
    },
    {
      CODE: "2K",
      DESCRIPTION: "Found Property",
    },
    {
      CODE: "2L",
      DESCRIPTION: "Lost Property",
    },
    {
      CODE: "2M",
      DESCRIPTION: "Missing Person",
    },
    {
      CODE: "2N",
      DESCRIPTION: "Civil Court Process",
    },
    {
      CODE: "2O",
      DESCRIPTION: "Court Orders",
    },
    {
      CODE: "2P",
      DESCRIPTION: "Public Relations",
    },
    {
      CODE: "2Q",
      DESCRIPTION: "Jury List Vetting",
    },
    {
      CODE: "2R",
      DESCRIPTION: "Recovery of motor vehicle",
    },
    {
      CODE: "2S",
      DESCRIPTION: "Summons",
    },
    {
      CODE: "2T",
      DESCRIPTION: "Warrant to Arrest/Fines Enforcement",
    },
    {
      CODE: "2U",
      DESCRIPTION: "Warrant of Seizure",
    },
    {
      CODE: "2V",
      DESCRIPTION: "Validation",
    },
    {
      CODE: "2W",
      DESCRIPTION: "Arrest Warrant (Other)",
    },
    {
      CODE: "2Y",
      DESCRIPTION: "Stock/Animals",
    },
    {
      CODE: "2Z",
      DESCRIPTION: "Other Service Request/Response",
    },
  ],
  "PREVENTATIVE CODES": [
    {
      CODE: "3A",
      DESCRIPTION: "Attend Scene of Crime/Incident",
    },
    {
      CODE: "3B",
      DESCRIPTION: "Beat",
    },
    {
      CODE: "3C",
      DESCRIPTION: "Crime Prevention Advice",
    },
    {
      CODE: "3D",
      DESCRIPTION: "Dog Care/Maintenance",
    },
    {
      CODE: "3E",
      DESCRIPTION: "Employee Vetting",
    },
    {
      CODE: "3F",
      DESCRIPTION: "Foot Patrol",
    },
    {
      CODE: "3G",
      DESCRIPTION: "Watchhouse/Counter Duty",
    },
    {
      CODE: "3H",
      DESCRIPTION: "Hotel Visit",
    },
    {
      CODE: "3J",
      DESCRIPTION: "Comm Centre Duty",
    },
    {
      CODE: "3K",
      DESCRIPTION: "Keys Taken",
    },
    {
      CODE: "3M",
      DESCRIPTION: "Directed Patrol / Mobile Patrol",
    },
    {
      CODE: "3O",
      DESCRIPTION: "Other Vetting",
    },
    {
      CODE: "3R",
      DESCRIPTION: "Road Checkpoint / Speed Camera Operation",
    },
    {
      CODE: "3S",
      DESCRIPTION: "Serve Summons/Execute Arrest Warrant",
    },
    {
      CODE: "3T",
      DESCRIPTION: "Stop/Search Car/Person",
    },
    {
      CODE: "3V",
      DESCRIPTION: "Staff Visit/Supervision",
    },
    {
      CODE: "3W",
      DESCRIPTION: "Watching/Observations",
    },
    {
      CODE: "3X",
      DESCRIPTION: "Video Job",
    },
    {
      CODE: "3Y",
      DESCRIPTION: "Other School Talks",
    },
    {
      CODE: "3Z",
      DESCRIPTION: "Other Preventative Task",
    },
  ],
  "OTHER DUTIES": [
    {
      CODE: "4A",
      DESCRIPTION: "Attend Scene/Meeting/Course/Other",
    },
    {
      CODE: "4B",
      DESCRIPTION: "Mortuary Procedure",
    },
    {
      CODE: "4C",
      DESCRIPTION: "Correspondence/Counter",
    },
    {
      CODE: "4D",
      DESCRIPTION: "Demonstration Duty",
    },
    {
      CODE: "4E",
      DESCRIPTION: "Escort Duty",
    },
    {
      CODE: "4F",
      DESCRIPTION: "Fingerprint Examination",
    },
    {
      CODE: "4G",
      DESCRIPTION: "Travel",
    },
    {
      CODE: "4H",
      DESCRIPTION: "Photography Job",
    },
    {
      CODE: "4I",
      DESCRIPTION: "Injury/Sickness",
    },
    {
      CODE: "4J",
      DESCRIPTION: "Court Security (Prison Escort)",
    },
    {
      CODE: "4K",
      DESCRIPTION: "Court Attendance (Witness, etc.)",
    },
    {
      CODE: "4L",
      DESCRIPTION: "Logistics/Staff Transport",
    },
    {
      CODE: "4M",
      DESCRIPTION: "Meal break",
    },
    {
      CODE: "4N",
      DESCRIPTION: "Victim Advice",
    },
    {
      CODE: "4P",
      DESCRIPTION: "Public Entertainment Duty",
    },
    {
      CODE: "4Q",
      DESCRIPTION: "Enquiry/Investigation",
    },
    {
      CODE: "4S",
      DESCRIPTION: "Vehicle servicing i.e. petrol/LPG",
    },
    {
      CODE: "4U",
      DESCRIPTION: "Lockup",
    },
    {
      CODE: "4V",
      DESCRIPTION: "VIP/DPS",
    },
    {
      CODE: "4W",
      DESCRIPTION: "Witness/Other Person Protection",
    },
    {
      CODE: "4X",
      DESCRIPTION: "Execute Search Warrant",
    },
    {
      CODE: "4Z",
      DESCRIPTION: "Airport Security",
    },
  ],
  "MISCELLANEOUS DUTIES": [
    {
      CODE: "5F",
      DESCRIPTION: "Family harm / domestic violence",
    },
    {
      CODE: "5H",
      DESCRIPTION: "EM bail suitability visit",
    },
    {
      CODE: "5K",
      DESCRIPTION: "Bail Check",
    },
    {
      CODE: "5M",
      DESCRIPTION: "Parole recall warrant",
    },
    {
      CODE: "6D",
      DESCRIPTION: "Bail Breach",
    },
    {
      CODE: "6E",
      DESCRIPTION: "Electronically monitored bail alarm activation",
    },
    {
      CODE: "6I",
      DESCRIPTION: "Illegal Street Racing",
    },
    {
      CODE: "6S",
      DESCRIPTION: "Breach of Police Safety Order",
    },
    {
      CODE: "6Y",
      DESCRIPTION: "Young person unaccompanied",
    },
    {
      CODE: "8P",
      DESCRIPTION: "Pandemic Response",
    },
    {
      CODE: "8PA",
      DESCRIPTION: "Pandemic 72 Hour Check",
    },
    {
      CODE: "8PB",
      DESCRIPTION: "Pandemic Person Check",
    },
    {
      CODE: "8PC",
      DESCRIPTION: "Pandemic Business Check",
    },
    {
      CODE: "8PD",
      DESCRIPTION: "Pandemic Check Via Telephone Only",
    },
    {
      CODE: "8PG",
      DESCRIPTION: "Mass Gathering",
    },
    {
      CODE: "8PL",
      DESCRIPTION: "Directed Patrol",
    },
    {
      CODE: "8PM",
      DESCRIPTION: "Reassurance Essential Facility",
    },
    {
      CODE: "8PZ",
      DESCRIPTION: "Pandemic Checkpoint",
    },
  ],
  ABBREVIATIONS: [
    {
      CODE: "EV",
      DESCRIPTION: "Enter Vehicle",
    },
    {
      CODE: "LV",
      DESCRIPTION: "Locate stolen vehicle",
    },
    {
      CODE: "NIA",
      DESCRIPTION: "National Intelligence Application",
    },
    {
      CODE: "QAFV",
      DESCRIPTION: "Query Address Family Violence",
    },
    {
      CODE: "QDH",
      DESCRIPTION: "Query Drivers History",
    },
    {
      CODE: "QEC",
      DESCRIPTION: "Query Engine/Chassis number",
    },
    {
      CODE: "QF",
      DESCRIPTION: "Query File",
    },
    {
      CODE: "QG",
      DESCRIPTION: "Query Firearm Licence",
    },
    {
      CODE: "QNFV",
      DESCRIPTION: "Query Name Family Violence",
    },
    {
      CODE: "QP",
      DESCRIPTION: "Query Person",
    },
    {
      CODE: "QR",
      DESCRIPTION: "Query Vehicle register",
    },
    {
      CODE: "QV",
      DESCRIPTION: "Query Vehicle of interest (VOI)",
    },
    {
      CODE: "QVA",
      DESCRIPTION: "Query something to do with offence history",
    },
    {
      CODE: "QVH",
      DESCRIPTION: "Query History of licence holder",
    },
    {
      CODE: "QVR",
      DESCRIPTION: "Query VOI and Register (combination of QV and QR)",
    },
    {
      CODE: "QI",
      DESCRIPTION: "Query Property",
    },
  ],
  "MISC ABBREVIATIONS": [
    {
      CODE: "47",
      DESCRIPTION: "Report for the Coroner",
    },
    {
      CODE: "56",
      DESCRIPTION: "See EBA (refers to section 56 of Land Transport Act 1998)",
    },
    {
      CODE: "58",
      DESCRIPTION: "See EBA (refers to section 58 of Transport Act 1962)",
    },
    {
      CODE: "101",
      DESCRIPTION: "Form for reporting minor offences (Pol101)",
    },
    {
      CODE: "258",
      DESCRIPTION: "General purpose police report form (Pol258)",
    },
    {
      CODE: "400",
      DESCRIPTION: "Family Violence Report (POL400)",
    },
    {
      CODE: "AOS",
      DESCRIPTION: "Armed Offenders Squad",
    },
    {
      CODE: "ASAP",
      DESCRIPTION: "As Soon As Possible",
    },
    {
      CODE: "CAD",
      DESCRIPTION: "Computer Assisted Dispatch system",
    },
    {
      CODE: "CAU",
      DESCRIPTION: "Child Abuse Unit",
    },
    {
      CODE: "CIB",
      DESCRIPTION: "Criminal Investigation Branch (detectives)",
    },
    {
      CODE: "CIU",
      DESCRIPTION:
        "Combined Investigative Unit (detectives and uniformed officers)",
    },
    {
      CODE: "CIS",
      DESCRIPTION: "Criminal Intelligence Section",
    },
    {
      CODE: "CRB",
      DESCRIPTION: "Criminal Registration Branch (Photos/Fingerprints)",
    },
    {
      CODE: "CVST",
      DESCRIPTION:
        "Commercial Vehicle Safety Team (previously CVIU - Commercial Vehicle Investigation Unit)",
    },
    {
      CODE: "DAO",
      DESCRIPTION: "Duly Appointed Officer",
    },
    {
      CODE: "DLICNO",
      DESCRIPTION: "Drivers Licence Number",
    },
    {
      CODE: "DPS",
      DESCRIPTION: "Diplomatic Protection Squad",
    },
    {
      CODE: "EAGLE",
      DESCRIPTION: "Police Helicopter",
    },
    {
      CODE: "EBA",
      DESCRIPTION: "Excess Breath Alcohol (drunk driver)",
    },
    {
      CODE: "FLAGS",
      DESCRIPTION:
        "Additional info attached to a persons file, usually a warning",
    },
    {
      CODE: "GBH",
      DESCRIPTION: "Grievous Bodily Harm",
    },
    {
      CODE: "GDB",
      DESCRIPTION: "General Duties Branch (Uniformed Officers)",
    },
    {
      CODE: "INFORMANT",
      DESCRIPTION: "A person who has reported or witnessed an offence",
    },
    {
      CODE: "TP",
      DESCRIPTION: "Team Policing",
    },
    {
      CODE: "TSB",
      DESCRIPTION: "Traffic Safety Branch",
    },
    {
      CODE: "TY",
      DESCRIPTION:
        "Police vehicle involved in crash (derived from the treasury (ty) form that has to be filled in afterwards)",
    },
    {
      CODE: "VOI",
      DESCRIPTION: "Vehicle of Interest",
    },
    {
      CODE: "WTA",
      DESCRIPTION: "Warrant To Arrest",
    },
    {
      CODE: "WTI",
      DESCRIPTION: "Wanted To Interview",
    },
    {
      CODE: "ANPR",
      DESCRIPTION: "Automatic Number Plate Recognition",
    },
    {
      CODE: "ION",
      DESCRIPTION: "Infringement offence notice",
    },
    {
      CODE: "MASTERS",
      DESCRIPTION: "A file containing a persons criminal history",
    },
    {
      CODE: "MPR",
      DESCRIPTION: "Miscellaneous property report",
    },
    {
      CODE: "NIA",
      DESCRIPTION:
        "National Intelligence Application (previously NIS - National Intelligence System)",
    },
    {
      CODE: "NORTHCOM",
      DESCRIPTION: "Northern Communications Centre (Auckland)",
    },
    {
      CODE: "NUA",
      DESCRIPTION: "No Unit Available",
    },
    {
      CODE: "OR",
      DESCRIPTION: "Offence Report",
    },
    {
      CODE: "PNT",
      DESCRIPTION: "Police Negotiation Team",
    },
    {
      CODE: "POI",
      DESCRIPTION: "Person of interest",
    },
    {
      CODE: "PRN",
      DESCRIPTION: "Person record number",
    },
    {
      CODE: "PSEUDO",
      DESCRIPTION:
        "A drivers licence with no classes, generally a disqualified driver",
    },
    {
      CODE: "QID",
      DESCRIPTION: "Officer ident number",
    },
    {
      CODE: "S FP",
      DESCRIPTION: "Safe forward point",
    },
    {
      CODE: "SIGNAL TEST",
      DESCRIPTION: "",
    },
    {
      CODE: "SIT-REP",
      DESCRIPTION: "Situation Report",
    },
    {
      CODE: "SOCO",
      DESCRIPTION: "Scene of Crimes Officer (Forensic)",
    },
    {
      CODE: "SSG",
      DESCRIPTION: "Specialist Search Group",
    },
    {
      CODE: "STG",
      DESCRIPTION: "Special Tactics Group",
    },
    {
      CODE: "STU",
      DESCRIPTION: "Strategic Traffic Unit",
    },
    {
      CODE: "STATUS-D",
      DESCRIPTION: "Disqualified",
    },
    {
      CODE: "STATUS-S",
      DESCRIPTION: "Stolen",
    },
    {
      CODE: "STATUS-W",
      DESCRIPTION: "Wanted",
    },
    {
      CODE: "SWITCHY",
      DESCRIPTION: "Computer terminal message",
    },
    {
      CODE: "TAR",
      DESCRIPTION: "Traffic accident report",
    },
    {
      CODE: "TESSA",
      DESCRIPTION: "Telecom telephone number database",
    },
    {
      CODE: "TON",
      DESCRIPTION: "Traffic offence notice",
    },
    {
      CODE: "YAS",
      DESCRIPTION: "Youth Aid Section",
    },
    {
      CODE: "YES",
      DESCRIPTION: "Youth Education Section",
    },
    {
      CODE: "FILE NUMBER",
      DESCRIPTION:
        "Number assigned to police file by the Wanganui Computer eg 971225/3456",
    },
    {
      CODE: "EVENT NUMBER",
      DESCRIPTION:
        "Number assigned to an incident dispatched from the communications centre by the CAD system",
    },
  ],
  VIOLENCE: [
    {
      CODE: "1110",
      DESCRIPTION: "Murder",
    },
    {
      CODE: "1120",
      DESCRIPTION: "Attempted Murder",
    },
    {
      CODE: "1130",
      DESCRIPTION: "Manslaughter",
    },
    {
      CODE: "1140",
      DESCRIPTION: "Infanticide",
    },
    {
      CODE: "1150",
      DESCRIPTION: "Abortion",
    },
    {
      CODE: "1160",
      DESCRIPTION: "Aids Suicide",
    },
    {
      CODE: "1210",
      DESCRIPTION: "Aids Suicide",
    },
    {
      CODE: "1220",
      DESCRIPTION: "Abduction",
    },
    {
      CODE: "1310",
      DESCRIPTION: "Aggravated robbery (Weapon)",
    },
    {
      CODE: "1316",
      DESCRIPTION: "Aggravated robbery (Manual)",
    },
    {
      CODE: "1320",
      DESCRIPTION: "Robbery",
    },
    {
      CODE: "1330",
      DESCRIPTION: "Assault with intent (Weapon)",
    },
    {
      CODE: "1336",
      DESCRIPTION: "Assault with intent (Manual)",
    },
    {
      CODE: "1340",
      DESCRIPTION: "Compelling execution of documents",
    },
    {
      CODE: "1410",
      DESCRIPTION: "Wounding with intent GBH",
    },
    {
      CODE: "1414",
      DESCRIPTION: "Wounding with intent to injure",
    },
    {
      CODE: "1420",
      DESCRIPTION: "Injures with intent to GBH",
    },
    {
      CODE: "1424",
      DESCRIPTION: "Injures with intent to injure",
    },
    {
      CODE: "1430",
      DESCRIPTION: "Aggravated wounding",
    },
    {
      CODE: "1440",
      DESCRIPTION: "Disables/Stupefies",
    },
    {
      CODE: "1460",
      DESCRIPTION: "Injures if death ensued",
    },
    {
      CODE: "1471",
      DESCRIPTION: "Throws acid with intent to injure",
    },
    {
      CODE: "1472",
      DESCRIPTION: "Poisons with intent to injure",
    },
    {
      CODE: "1474",
      DESCRIPTION: "Infects with disease",
    },
    {
      CODE: "1480",
      DESCRIPTION: "Use firearm on Police officer",
    },
    {
      CODE: "1483",
      DESCRIPTION: "Commission of crime (firearm)",
    },
    {
      CODE: "1490",
      DESCRIPTION: "Assault with a weapon",
    },
    {
      CODE: "1510",
      DESCRIPTION: "Serious Assaults",
    },
    {
      CODE: "1520",
      DESCRIPTION: "Assault With Intent To Injure",
    },
    {
      CODE: "1530",
      DESCRIPTION: "Assault On Child",
    },
    {
      CODE: "1540",
      DESCRIPTION: "Male Assaults Female",
    },
    {
      CODE: "1550",
      DESCRIPTION: "Assault Police",
    },
    {
      CODE: "1560",
      DESCRIPTION: "Assault Person Assist Police",
    },
    {
      CODE: "1570",
      DESCRIPTION: "Assaults Person Lawful Ex Process",
    },
    {
      CODE: "1580",
      DESCRIPTION: "Common Assault",
    },
    {
      CODE: "1610",
      DESCRIPTION: "Assault On Law Enforcement Officers (Summary Offence)",
    },
    {
      CODE: "1620",
      DESCRIPTION: "Assault Person Assisting Police (Summary Offence)",
    },
    {
      CODE: "1630",
      DESCRIPTION: "Assaults Official",
    },
    {
      CODE: "1640",
      DESCRIPTION: "Minor Assaults",
    },
    {
      CODE: "1650",
      DESCRIPTION: "Miscellaneous Common Assault",
    },
    {
      CODE: "1710",
      DESCRIPTION: "Threatens To Kill",
    },
    {
      CODE: "1720",
      DESCRIPTION: "Threatening Act To Person Or Property",
    },
    {
      CODE: "1730",
      DESCRIPTION: "Threatening Behaviour",
    },
    {
      CODE: "1740",
      DESCRIPTION: "Demand With Intent To Steal or Extort",
    },
    {
      CODE: "1748",
      DESCRIPTION: "Blackmail",
    },
    {
      CODE: "1754",
      DESCRIPTION: "Possess Offensive Weapon",
    },
    {
      CODE: "1758",
      DESCRIPTION: "Unlawful possess knife",
    },
    {
      CODE: "1770",
      DESCRIPTION: "Fail To Provide Necessities Of Life",
    },
    {
      CODE: "1790",
      DESCRIPTION: "Threatening To Damage Property",
    },
    {
      CODE: "1810",
      DESCRIPTION: "Group Assemblies",
    },
    {
      CODE: "1811",
      DESCRIPTION: "Rioting",
    },
    {
      CODE: "1820",
      DESCRIPTION: "Unlawful Assembly",
    },
    {
      CODE: "1830",
      DESCRIPTION: "Crimes Against Personal Privacy",
    },
    {
      CODE: "1840",
      DESCRIPTION: "Harassment",
    },
    {
      CODE: "1850",
      DESCRIPTION: "Participation and Association Offences",
    },
    {
      CODE: "1853",
      DESCRIPTION: "Participates in criminal group",
    },
  ],
  SEXUAL: [
    {
      CODE: "2210",
      DESCRIPTION: "Indecent Performances And Acts",
    },
    {
      CODE: "2220",
      DESCRIPTION: "Obscene Exposure",
    },
    {
      CODE: "2231",
      DESCRIPTION: "Genital Mutilation",
    },
    {
      CODE: "2380",
      DESCRIPTION: "Sexual Intercourse With Child Under Care",
    },
    {
      CODE: "2510",
      DESCRIPTION: "Indecent Videos",
    },
    {
      CODE: "2610",
      DESCRIPTION: "Abduct young person for sex",
    },
    {
      CODE: "2620",
      DESCRIPTION: "Abduct person for sex",
    },
    {
      CODE: "2632",
      DESCRIPTION: "Indecently Assaults Female Over 16",
    },
    {
      CODE: "2635",
      DESCRIPTION: "Indecent Assault On Male Over 16",
    },
    {
      CODE: "2650",
      DESCRIPTION: "Rape",
    },
    {
      CODE: "2655",
      DESCRIPTION: "Sexual Conduct with child under 12 years",
    },
    {
      CODE: "2656",
      DESCRIPTION: "Sexual conduct with young person",
    },
    {
      CODE: "2660",
      DESCRIPTION: "Attempt rape and assault with intent to rape",
    },
    {
      CODE: "2670",
      DESCRIPTION: "Assault Intent To Commit Sexual Violation",
    },
    {
      CODE: "2710",
      DESCRIPTION: "Incest",
    },
    {
      CODE: "2720",
      DESCRIPTION: "Bestiality",
    },
    {
      CODE: "2740",
      DESCRIPTION: "Sexual grooming",
    },
    {
      CODE: "2810",
      DESCRIPTION: "Sexual conduct with young person under 16 years",
    },
    {
      CODE: "2813",
      DESCRIPTION: "Sexual Intercourse With subnormal female",
    },
    {
      CODE: "2830",
      DESCRIPTION: "Indecent Assaults by Female",
    },
    {
      CODE: "2840",
      DESCRIPTION: "Indecency FF",
    },
    {
      CODE: "2860",
      DESCRIPTION: "Indecency MF",
    },
    {
      CODE: "2870",
      DESCRIPTION: "Indecency MM",
    },
    {
      CODE: "2910",
      DESCRIPTION: "Immoral Behaviour/Miscellaneous",
    },
    {
      CODE: "2950",
      DESCRIPTION: "Child Sex Tours Offences",
    },
    {
      CODE: "2951",
      DESCRIPTION: "Sex with child outside NZ",
    },
    {
      CODE: "2962",
      DESCRIPTION: "Knowingly makes objectionable publication",
    },
    {
      CODE: "2963",
      DESCRIPTION: "Supplied restricted material",
    },
    {
      CODE: "2966",
      DESCRIPTION: "Exhibits objectionable material to persons under 18",
    },
    {
      CODE: "2970",
      DESCRIPTION: "Offences for Commercial sex services",
    },
    {
      CODE: "2973",
      DESCRIPTION: "Prostitution Under 18",
    },
    {
      CODE: "?",
      DESCRIPTION: "Sexual violation",
    },
  ],
  "DRUGS/ANTI-SOCIAL BEHAVIOUR": [
    {
      CODE: "3110",
      DESCRIPTION: "Import, Supply or Produce Class A Drug",
    },
    {
      CODE: "3115",
      DESCRIPTION: "Import, Supply or Produce Class B Drug",
    },
    {
      CODE: "3140",
      DESCRIPTION: "Possess to Supply Class A Drug",
    },
    {
      CODE: "3145",
      DESCRIPTION: "Possess to Supply Class B Drug",
    },
    {
      CODE: "3151",
      DESCRIPTION: "Possess Class A",
    },
    {
      CODE: "3154",
      DESCRIPTION: "Possess Class B",
    },
    {
      CODE: "3158",
      DESCRIPTION: "Possess Instruments A & B",
    },
    {
      CODE: "3160",
      DESCRIPTION: "Consume drugs class A & B",
    },
    {
      CODE: "3171",
      DESCRIPTION: "Cultivate",
    },
    {
      CODE: "3181",
      DESCRIPTION: "Permit premises A & B",
    },
    {
      CODE: "3187",
      DESCRIPTION: "Aids offences outside New Zealand",
    },
    {
      CODE: "3191",
      DESCRIPTION: "Conspiracy to deal A Class Drugs",
    },
    {
      CODE: "3192",
      DESCRIPTION: "Conspiracy to deal B Class Drugs",
    },
    {
      CODE: "3193",
      DESCRIPTION: "Conspiracy to deal C Class Drugs",
    },
    {
      CODE: "3210",
      DESCRIPTION: "Import, Supply or Produce Class C Drugs",
    },
    {
      CODE: "3240",
      DESCRIPTION: "Possess to supply class C Drugs",
    },
    {
      CODE: "3150",
      DESCRIPTION: "Possess Class C Drugs",
    },
    {
      CODE: "3255",
      DESCRIPTION: "Possess Instruments (cannabis)",
    },
    {
      CODE: "3271",
      DESCRIPTION: "Cultivate cannabis",
    },
    {
      CODE: "3273",
      DESCRIPTION: "Possess equipment or substance to produce drug",
    },
    {
      CODE: "3281",
      DESCRIPTION: "Permit premises cannabis",
    },
    {
      CODE: "3410",
      DESCRIPTION: "Bookmaking",
    },
    {
      CODE: "3420",
      DESCRIPTION: "Gaming House Offence",
    },
    {
      CODE: "3430",
      DESCRIPTION: "Betting Offences",
    },
    {
      CODE: "3470",
      DESCRIPTION: "Casino Offences",
    },
    {
      CODE: "3510",
      DESCRIPTION: "Obstruct Police",
    },
    {
      CODE: "3515",
      DESCRIPTION: "Resist Person Assisting Police",
    },
    {
      CODE: "3516",
      DESCRIPTION: "Resist Other Official",
    },
    {
      CODE: "3517",
      DESCRIPTION: "Obstruct Public Place",
    },
    {
      CODE: "3521",
      DESCRIPTION: "Incite Violence, disorder or lawlessness",
    },
    {
      CODE: "3529",
      DESCRIPTION: "Other Incite or encourage Offences",
    },
    {
      CODE: "3535",
      DESCRIPTION: "Offensive Behaviour",
    },
    {
      CODE: "3537",
      DESCRIPTION: "Disorderly Behaviour Private Premises",
    },
    {
      CODE: "3538",
      DESCRIPTION: "Threatening Behaviour likely to Cause Violence",
    },
    {
      CODE: "3540",
      DESCRIPTION: "Language offences",
    },
    {
      CODE: "3560",
      DESCRIPTION: "Miscellaneous Disorder Offences",
    },
    {
      CODE: "3570",
      DESCRIPTION: "Disorderly Assembly",
    },
    {
      CODE: "3610",
      DESCRIPTION: "Vagrancy Offences",
    },
    {
      CODE: "3620",
      DESCRIPTION: "Preparing To Commit Crimes",
    },
    {
      CODE: "3710",
      DESCRIPTION: "Family Offences",
    },
    {
      CODE: "3711",
      DESCRIPTION: "Cruelty To Child",
    },
    {
      CODE: "3712",
      DESCRIPTION: "Wilful Neglect Child",
    },
    {
      CODE: "3713",
      DESCRIPTION: "Abandon child under 6 years",
    },
    {
      CODE: "3714",
      DESCRIPTION: "Leaving Child Without Reasonable Supervisor",
    },
    {
      CODE: "3719",
      DESCRIPTION: "Other Child Abuse Non Assault",
    },
    {
      CODE: "3743",
      DESCRIPTION: "Offence Against Matrimonial Prop Act",
    },
    {
      CODE: "3746",
      DESCRIPTION: "Failure Attend Court",
    },
    {
      CODE: "3750",
      DESCRIPTION: "Family proceedings Act offences",
    },
    {
      CODE: "3796",
      DESCRIPTION: "Slave Dealing Under 18",
    },
    {
      CODE: "3797",
      DESCRIPTION: "Sex exploitation",
    },
    {
      CODE: "3810",
      DESCRIPTION: "Publishing and Document Offences",
    },
    {
      CODE: "3820",
      DESCRIPTION: "Child and Young Person Act Offences",
    },
    {
      CODE: "3851",
      DESCRIPTION: "Contravenes Protection Order (Firearm)",
    },
    {
      CODE: "3852",
      DESCRIPTION: "Contravenes Protection Order (Non Firearm)",
    },
    {
      CODE: "3853",
      DESCRIPTION: "Fail To Comply Conditions Of Order (Firearm)",
    },
    {
      CODE: "3854",
      DESCRIPTION: "Fail Comply Condition Of Order (Non Firearm)",
    },
    {
      CODE: "3856",
      DESCRIPTION: "Breach Of Publication Restrictions",
    },
    {
      CODE: "3910",
      DESCRIPTION: "Closure Of Licensed Premises for Rioting or Fighting",
    },
    {
      CODE: "3920",
      DESCRIPTION: "Licensed Premises Liquor Offence Selling to minor(s)",
    },
    {
      CODE: "3930",
      DESCRIPTION: "Licensed Premises Liquor Offence Intoxicated Person(s)",
    },
    {
      CODE: "3940",
      DESCRIPTION: "Offences by minors Sale Of Liquor",
    },
    {
      CODE: "3950",
      DESCRIPTION: "Refusal to admit police on Licensed Premises",
    },
    {
      CODE: "3960",
      DESCRIPTION: "Sales By Unlicensed Persons",
    },
    {
      CODE: "3970",
      DESCRIPTION: "Unlicensed Premises Liquor Offences",
    },
  ],
  DISHONESTY: [
    {
      CODE: "4120",
      DESCRIPTION: "Burglary",
    },
    {
      CODE: "4130",
      DESCRIPTION: "Burglary Associated Offences",
    },
    {
      CODE: "4155",
      DESCRIPTION: "Aggravated burglary",
    },
    {
      CODE: "4210",
      DESCRIPTION: "Unlawful Taking Motor Vehicle",
    },
    {
      CODE: "4220",
      DESCRIPTION: "Unlawfully Interfere Motor Vehicle",
    },
    {
      CODE: "4230",
      DESCRIPTION: "Take, convert or interfere Bicycle",
    },
    {
      CODE: "4240",
      DESCRIPTION: "Miscellaneous Car Conversion Etc",
    },
    {
      CODE: "4300",
      DESCRIPTION: "General Theft",
    },
    {
      CODE: "4410",
      DESCRIPTION: "Receiving Stolen Goods",
    },
    {
      CODE: "4430",
      DESCRIPTION: "Money Laundering Offences",
    },
    {
      CODE: "4435",
      DESCRIPTION: "Laundering proceeds of drug dealing",
    },
    {
      CODE: "4440",
      DESCRIPTION: "Financial Transaction Reporting",
    },
    {
      CODE: "4511",
      DESCRIPTION: "Forgery",
    },
    {
      CODE: "4512",
      DESCRIPTION: "Possesses Forged Banknote",
    },
    {
      CODE: "4515",
      DESCRIPTION: "Possesses Implements For Forgery",
    },
    {
      CODE: "4517",
      DESCRIPTION: "Imitating Authorised Marks",
    },
    {
      CODE: "4520",
      DESCRIPTION: "False accounting",
    },
    {
      CODE: "4550",
      DESCRIPTION: "Credit by fraud",
    },
    {
      CODE: "4570",
      DESCRIPTION: "Miscellaneous fraud",
    },
    {
      CODE: "4575",
      DESCRIPTION: "Altering document with intent",
    },
    {
      CODE: "4581",
      DESCRIPTION: "Forges bank card to obtain money",
    },
    {
      CODE: "4590",
      DESCRIPTION: "False pretence by credit card or cheques",
    },
    {
      CODE: "4631",
      DESCRIPTION: "Access computer for dishonest purpose",
    },
    {
      CODE: "4633",
      DESCRIPTION: "Damage computer endangering life",
    },
    {
      CODE: "4635",
      DESCRIPTION: "Makes Sells software for crime",
    },
    {
      CODE: "4636",
      DESCRIPTION: "Access computer without Authority",
    },
  ],
  "PROPERTY DAMAGE": [
    {
      CODE: "5110",
      DESCRIPTION: "Arson",
    },
    {
      CODE: "5113",
      DESCRIPTION: "Attempt Arson",
    },
    {
      CODE: "5120",
      DESCRIPTION: "Wilful damage",
    },
    {
      CODE: "5141",
      DESCRIPTION: "Intentional Damage danger To Life",
    },
    {
      CODE: "5142",
      DESCRIPTION: "Intentional Damage no Interest",
    },
    {
      CODE: "5143",
      DESCRIPTION: "Intentional Damage",
    },
    {
      CODE: "5144",
      DESCRIPTION: "Intentional Damage reckless Disregard",
    },
    {
      CODE: "5151",
      DESCRIPTION: "Contaminating Food, crops or other",
    },
    {
      CODE: "5152",
      DESCRIPTION: "Causing Disease Or Sickness In Animals",
    },
    {
      CODE: "5215",
      DESCRIPTION: "Endangering Transport",
    },
    {
      CODE: "5224",
      DESCRIPTION: "Impeding rescue",
    },
    {
      CODE: "5225",
      DESCRIPTION: "Setting mantraps",
    },
    {
      CODE: "5231",
      DESCRIPTION: "Hijack plane",
    },
    {
      CODE: "5232",
      DESCRIPTION: "Endangering safety of plane",
    },
    {
      CODE: "5235",
      DESCRIPTION: "Endangering safety in Airport",
    },
    {
      CODE: "5810",
      DESCRIPTION: "Gambling Act Offences",
    },
    {
      CODE: "5950",
      DESCRIPTION: "Procure or possess new drugs",
    },
  ],
  MISCELLANEOUS: [
    {
      CODE: "6110",
      DESCRIPTION: "Offences Under Trespass Act",
    },
    {
      CODE: "6120",
      DESCRIPTION: "Trespass Under Specific Statute",
    },
    {
      CODE: "6130",
      DESCRIPTION: "Miscellaneous Trespass Offences",
    },
    {
      CODE: "6210",
      DESCRIPTION: "Littering",
    },
    {
      CODE: "6311",
      DESCRIPTION: "Aggravated Cruelty",
    },
    {
      CODE: "6313",
      DESCRIPTION: "Fails to alleviate pain or suffering of animal",
    },
    {
      CODE: "6319",
      DESCRIPTION: "Other Neglect Or Cruelty To Animals",
    },
    {
      CODE: "6332",
      DESCRIPTION: "Breach Of Impounding Act",
    },
    {
      CODE: "6333",
      DESCRIPTION: "Breach Of Fisheries Act",
    },
    {
      CODE: "6334",
      DESCRIPTION: "Breach Of Wildlife Act",
    },
    {
      CODE: "6335",
      DESCRIPTION: "Breach Of Wild Animal Control Act",
    },
    {
      CODE: "6337",
      DESCRIPTION: "Poaching",
    },
    {
      CODE: "6339",
      DESCRIPTION: "Other Miscellaneous Offs Re Animals",
    },
    {
      CODE: "6340",
      DESCRIPTION: "Police Dogs Police Amend Act Offences",
    },
    {
      CODE: "6391",
      DESCRIPTION: "Cruelty to or ill-treatment Of Animals",
    },
    {
      CODE: "6393",
      DESCRIPTION: "Transportation Offences",
    },
    {
      CODE: "6399",
      DESCRIPTION: "Animal Welfare Act Miscellaneous Offences",
    },
    {
      CODE: "6520",
      DESCRIPTION: "Railway Abuses",
    },
    {
      CODE: "6530",
      DESCRIPTION: "Fire Service Abuses",
    },
    {
      CODE: "6550",
      DESCRIPTION: "Telecommunications Act Offences",
    },
    {
      CODE: "6560",
      DESCRIPTION: "Postal Services Act Offences",
    },
    {
      CODE: "6570",
      DESCRIPTION: "Forest And Rural Fire Act 1977 Offences",
    },
    {
      CODE: "6810",
      DESCRIPTION: "Licensed Dealer Offences",
    },
    {
      CODE: "6820",
      DESCRIPTION: "General Restrictions",
    },
    {
      CODE: "6830",
      DESCRIPTION: "General Obligations",
    },
    {
      CODE: "6840",
      DESCRIPTION: "Offences Re Licences",
    },
    {
      CODE: "6851",
      DESCRIPTION:
        "Unlawfully Carries or possess Firearm, Restricted Weapon, explosives or ammunition",
    },
    {
      CODE: "6852",
      DESCRIPTION: "Unlawfully Carries Imitation Firearm",
    },
    {
      CODE: "6853",
      DESCRIPTION: "Intoxicated In Charge Of Firearm",
    },
    {
      CODE: "6854",
      DESCRIPTION: "Discharges Firearm In or near place or dwelling",
    },
    {
      CODE: "6855",
      DESCRIPTION: "Uses or discharges Other Firearm Type",
    },
    {
      CODE: "6856",
      DESCRIPTION: "Unlawfully Possess Pistol or Restricted Weapon",
    },
    {
      CODE: "6857",
      DESCRIPTION: "Unlawful Carry/possess F'arm/amm/ex-p/place",
    },
    {
      CODE: "6859",
      DESCRIPTION: "General Firearm Offences",
    },
    {
      CODE: "6861",
      DESCRIPTION: "Present Firearm or Restricted Weapon At Person",
    },
    {
      CODE: "6862",
      DESCRIPTION: "Present Object Like Firearm or Restricted Weapon At Person",
    },
    {
      CODE: "6863",
      DESCRIPTION: "Careless use of Firearm Causing Death or bodily Injury",
    },
    {
      CODE: "6864",
      DESCRIPTION: "Leaving Firearm Loaded Endangering Life",
    },
    {
      CODE: "6865",
      DESCRIPTION: "Reckless Discharge of Firearm or Restricted Weapon",
    },
    {
      CODE: "6866",
      DESCRIPTION: "Uses Firearm To Prevent or Resist Arrest",
    },
    {
      CODE: "6867",
      DESCRIPTION:
        "Posses Firearm, Restricted weapon, Explosives, or Ammunition in commission of crime",
    },
    {
      CODE: "6868",
      DESCRIPTION:
        "Carry Firearm, Restricted Weapon or explosives With Intent to commit crime",
    },
    {
      CODE: "6869",
      DESCRIPTION: "Other Offence Re General firearm Use",
    },
    {
      CODE: "6871",
      DESCRIPTION: "Obstructs Police during licence enquiries",
    },
    {
      CODE: "6873",
      DESCRIPTION: "Fail To Report Injury under Firearms Injury Arms Act",
    },
    {
      CODE: "6874",
      DESCRIPTION: "Fail To Comply with Notice of Unsafe Firearm or Pistol",
    },
    {
      CODE: "6875",
      DESCRIPTION: "Carry Loaded Firearm In Vehicle",
    },
    {
      CODE: "6879",
      DESCRIPTION: "Other Offences Involving Firearm Use",
    },
  ],
  ADMINISTRATIVE: [
    {
      CODE: "7110",
      DESCRIPTION: "Offences Against Justice",
    },
    {
      CODE: "7210",
      DESCRIPTION: "Births/Deaths & Marriages",
    },
    {
      CODE: "7310",
      DESCRIPTION: "Immigration",
    },
    {
      CODE: "7410",
      DESCRIPTION: "Racial",
    },
    {
      CODE: "7420",
      DESCRIPTION: "Bloods pickup",
    },
    {
      CODE: "7510",
      DESCRIPTION: "Against National Interest",
    },
    {
      CODE: "7610",
      DESCRIPTION: "Bylaw Breaches",
    },
  ],
  "UNIT TYPE": [
    {
      CODE: "A",
      DESCRIPTION: "Commissioned Officer",
    },
    {
      CODE: "B",
      DESCRIPTION: "Beat Unit",
    },
    {
      CODE: "C",
      DESCRIPTION: "Crime Car",
    },
    {
      CODE: "D",
      DESCRIPTION: "Dog Unit",
    },
    {
      CODE: "E",
      DESCRIPTION: "Enquiry Car",
    },
    {
      CODE: "F",
      DESCRIPTION: "Forensics (Fingerprints/Photography)",
    },
    {
      CODE: "G",
      DESCRIPTION: "Logistics",
    },
    {
      CODE: "H",
      DESCRIPTION: "Highway Patrol Unit",
    },
    {
      CODE: "I",
      DESCRIPTION: "Incident Patrol - I-Car",
    },
    {
      CODE: "J",
      DESCRIPTION: "CIU",
    },
    {
      CODE: "K",
      DESCRIPTION: "SOCO",
    },
    {
      CODE: "L",
      DESCRIPTION: "Maritime Unit",
    },
    {
      CODE: "M",
      DESCRIPTION: "Motorcycle Unit",
    },
    {
      CODE: "N",
      DESCRIPTION: "Senior Sergeant",
    },
    {
      CODE: "O",
      DESCRIPTION: "Community Constable",
    },
    {
      CODE: "P",
      DESCRIPTION: "Team Policing",
    },
    {
      CODE: "Q",
      DESCRIPTION: "One Man Patrol",
    },
    {
      CODE: "R",
      DESCRIPTION: "Rural Patrol Car",
    },
    {
      CODE: "S",
      DESCRIPTION: "Shift Supervisor Sergeant General Duties",
    },
    {
      CODE: "T",
      DESCRIPTION: "Traffic Unit",
    },
    {
      CODE: "U",
      DESCRIPTION: "Motorway Patrol Unit",
    },
    {
      CODE: "V",
      DESCRIPTION: "Shift Supervisor Sergeant Traffic",
    },
    {
      CODE: "W",
      DESCRIPTION: "Special Traffic - STU/ CVIU/ Speed Camera",
    },
    {
      CODE: "X",
      DESCRIPTION: "General CIB",
    },
    {
      CODE: "Y",
      DESCRIPTION: "Youth Aid / YES",
    },
    {
      CODE: "Z",
      DESCRIPTION:
        "Diplomatic /VIP /Witness Protection / Community camera operator",
    },
  ],
};
