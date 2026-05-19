import { createService } from "@/lib/catalog/service-factory";
import type { CloudService } from "@/types";

/** Additional catalog entries (finance, marketing, HR, AI, etc.). */
export const additionalServices: CloudService[] = [
  // Finance SaaS
  createService("101", "Mambu", "Cloud-native core banking platform for lenders and banks.", "Mambu", "https://www.mambu.com", ["banking", "fintech", "core-banking"], { departments: ["finance"] }),
  createService("102", "Adyen", "Global payments platform for unified commerce online and in-store.", "Adyen", "https://www.adyen.com", ["payments", "fintech"], { departments: ["finance"] }),
  createService("103", "Square", "Payments, point-of-sale, and business banking for sellers.", "Block", "https://squareup.com", ["payments", "pos"], { departments: ["finance"] }),
  createService("104", "PayPal", "Digital payments and checkout for consumers and merchants worldwide.", "PayPal", "https://www.paypal.com", ["payments", "checkout"], { departments: ["finance"] }),

  // Marketing SaaS
  createService("201", "Salesforce", "CRM and customer engagement platform for sales, service, and marketing.", "Salesforce", "https://www.salesforce.com", ["crm", "sales", "marketing"], { departments: ["marketing", "customer-support"] }),
  createService("202", "Adobe Experience Cloud", "Enterprise suite for analytics, personalization, and digital experience.", "Adobe", "https://business.adobe.com/products/experience-cloud.html", ["cx", "personalization"], { departments: ["marketing"] }),
  createService("203", "Oracle Eloqua", "B2B marketing automation for lead management and nurture campaigns.", "Oracle", "https://www.oracle.com/cx/marketing/automation/", ["marketing-automation", "b2b"], { departments: ["marketing"] }),
  createService("204", "Hootsuite", "Social media management, scheduling, and analytics across networks.", "Hootsuite", "https://www.hootsuite.com", ["social-media", "scheduling"], { departments: ["marketing"] }),
  createService("205", "Sprout Social", "Social publishing, listening, and reporting for brand teams.", "Sprout Social", "https://sproutsocial.com", ["social-media", "analytics"], { departments: ["marketing"] }),
  createService("206", "Buffer", "Simple social scheduling and engagement tools for growing brands.", "Buffer", "https://buffer.com", ["social-media", "scheduling"], { departments: ["marketing"] }),
  createService("207", "Meta Business Suite", "Manage Facebook and Instagram pages, ads, and insights in one place.", "Meta", "https://business.facebook.com", ["social-media", "ads"], { departments: ["marketing"] }),
  createService("208", "Segment", "Customer data platform for collecting and routing first-party event data.", "Twilio", "https://segment.com", ["cdp", "analytics"], { departments: ["marketing", "engineering"] }),
  createService("209", "Adobe Real-Time CDP", "Real-time customer profiles for personalized marketing activation.", "Adobe", "https://business.adobe.com/products/real-time-cdp.html", ["cdp", "personalization"], { departments: ["marketing"] }),
  createService("210", "Dynamic Yield", "AI-powered personalization and experimentation for web and app.", "Dynamic Yield", "https://www.dynamicyield.com", ["personalization", "ab-testing"], { departments: ["marketing"] }),
  createService("211", "Optimizely", "Experimentation and feature management for digital product teams.", "Optimizely", "https://www.optimizely.com", ["experimentation", "feature-flags"], { departments: ["marketing", "engineering"] }),
  createService("212", "SEMrush", "SEO, content, and competitive intelligence for search marketing.", "SEMrush", "https://www.semrush.com", ["seo", "sem"], { departments: ["marketing"] }),
  createService("213", "Google Marketing Platform", "Integrated advertising and analytics tools from Google.", "Google", "https://marketingplatform.google.com", ["ads", "analytics"], { departments: ["marketing"] }),
  createService("214", "Google Analytics", "Web and app analytics for traffic, conversions, and audiences.", "Google", "https://analytics.google.com", ["analytics", "web"], { departments: ["marketing"] }),
  createService("215", "Tableau Cloud", "Cloud analytics and dashboards for visualizing business data.", "Salesforce", "https://www.tableau.com", ["bi", "visualization"], { departments: ["marketing", "finance"] }),
  createService("216", "Power BI", "Business intelligence with interactive reports and Microsoft integration.", "Microsoft", "https://powerbi.microsoft.com", ["bi", "reporting"], { departments: ["marketing", "finance"] }),
  createService("217", "Datorama", "Marketing intelligence and cross-channel performance reporting.", "Salesforce", "https://www.datorama.com", ["marketing-analytics", "attribution"], { departments: ["marketing"] }),
  createService("218", "Adobe Creative Cloud", "Creative apps for design, photo, video, and brand production.", "Adobe", "https://www.adobe.com/creativecloud.html", ["design", "creative"], { departments: ["marketing"] }),
  createService("219", "Canva", "Online design platform for marketing assets and brand templates.", "Canva", "https://www.canva.com", ["design", "templates"], { departments: ["marketing"] }),
  createService("220", "Figma", "Collaborative interface design for product and marketing teams.", "Figma", "https://www.figma.com", ["design", "collaboration"], { departments: ["marketing", "engineering"] }),
  createService("221", "Sketch", "Vector design toolkit for digital product and brand design.", "Sketch", "https://www.sketch.com", ["design", "ui"], { departments: ["marketing"] }),
  createService("222", "Monday.com", "Work OS for campaigns, projects, and cross-team marketing workflows.", "monday.com", "https://monday.com", ["project-management", "workflow"], { departments: ["marketing", "operations"] }),
  createService("223", "Asana", "Work management for marketing projects, tasks, and team coordination.", "Asana", "https://asana.com", ["project-management", "tasks"], { departments: ["marketing"] }),

  // Recruitment SaaS
  createService("301", "SmartRecruiters", "Talent acquisition suite with ATS and collaborative hiring.", "SmartRecruiters", "https://www.smartrecruiters.com", ["ats", "hiring"], { departments: ["recruitment"] }),
  createService("302", "Oracle Recruiting Cloud", "Enterprise recruiting within Oracle Fusion HCM.", "Oracle", "https://www.oracle.com/human-capital-management/recruiting/", ["ats", "enterprise"], { departments: ["recruitment", "hr"] }),
  createService("303", "SAP SuccessFactors Recruiting", "Cloud recruiting and onboarding as part of SuccessFactors.", "SAP", "https://www.sap.com/products/hcm/recruiting.html", ["ats", "enterprise"], { departments: ["recruitment", "hr"] }),
  createService("304", "LinkedIn Talent Solutions", "Sourcing, job posts, and employer brand on LinkedIn.", "LinkedIn", "https://business.linkedin.com/talent-solutions", ["sourcing", "employer-brand"], { departments: ["recruitment"] }),
  createService("305", "Indeed Hiring Platform", "Job advertising and applicant management from Indeed.", "Indeed", "https://www.indeed.com/hire", ["job-boards", "ats"], { departments: ["recruitment"] }),
  createService("306", "ZipRecruiter", "Job distribution and candidate matching for growing employers.", "ZipRecruiter", "https://www.ziprecruiter.com", ["job-boards", "hiring"], { departments: ["recruitment"] }),
  createService("307", "Calendly", "Scheduling automation for interviews and recruiter coordination.", "Calendly", "https://calendly.com", ["scheduling", "automation"], { departments: ["recruitment", "operations"] }),
  createService("308", "GoodTime", "High-volume interview scheduling for recruiting teams.", "GoodTime", "https://www.goodtime.io", ["scheduling", "interviews"], { departments: ["recruitment"] }),
  createService("309", "Microsoft Bookings", "Appointment scheduling integrated with Microsoft 365.", "Microsoft", "https://www.microsoft.com/microsoft-365/business/scheduling-and-booking", ["scheduling", "microsoft"], { departments: ["recruitment", "operations"] }),
  createService("310", "HireRight", "Employment background screening and workforce compliance.", "HireRight", "https://www.hireright.com", ["background-checks", "compliance"], { departments: ["recruitment", "legal"] }),
  createService("311", "Checkr", "Modern background checks and credential verification API.", "Checkr", "https://checkr.com", ["background-checks", "api"], { departments: ["recruitment"] }),

  // HR SaaS
  createService("401", "BambooHR", "HRIS for small and mid-sized businesses with core HR workflows.", "BambooHR", "https://www.bamboohr.com", ["hris", "smb"], { departments: ["hr"] }),
  createService("402", "Oracle Fusion Cloud HCM", "Enterprise human capital management across the employee lifecycle.", "Oracle", "https://www.oracle.com/human-capital-management/", ["hcm", "enterprise"], { departments: ["hr"] }),
  createService("403", "Gusto", "Payroll, benefits, and HR for small businesses in the US.", "Gusto", "https://gusto.com", ["payroll", "benefits"], { departments: ["hr", "finance"] }),
  createService("404", "Sage HR", "HR and people management for Sage business customers.", "Sage", "https://www.sage.com/en-gb/products/sage-hr/", ["hris", "smb"], { departments: ["hr"], slug: "sage-hr" }),

  // Training
  createService("501", "LinkedIn Learning", "Professional courses and skill paths for workforce development.", "LinkedIn", "https://www.linkedin.com/learning/", ["lms", "courses"], { departments: ["training", "hr"] }),
  createService("502", "Coursera", "Online degrees and courses from universities and industry partners.", "Coursera", "https://www.coursera.org", ["lms", "courses"], { departments: ["training"] }),
  createService("503", "Udemy Business", "On-demand learning marketplace for employee upskilling.", "Udemy", "https://business.udemy.com", ["lms", "courses"], { departments: ["training"], slug: "udemy-business" }),
  createService("504", "Pluralsight", "Tech skills platform for developers and IT teams.", "Pluralsight", "https://www.pluralsight.com", ["lms", "tech-skills"], { departments: ["training", "engineering"] }),
  createService("505", "Skillsoft", "Enterprise learning content for leadership, compliance, and IT.", "Skillsoft", "https://www.skillsoft.com", ["lms", "enterprise"], { departments: ["training", "compliance-platforms"] }),

  // Security awareness training
  createService("601", "KnowBe4", "Security awareness training and simulated phishing for employees.", "KnowBe4", "https://www.knowbe4.com", ["security-training", "phishing"], { departments: ["security-awareness-training"] }),
  createService("602", "Mimecast Awareness Training", "Human risk management and security awareness content.", "Mimecast", "https://www.mimecast.com/products/awareness-training/", ["security-training", "email-security"], { departments: ["security-awareness-training"] }),
  createService("603", "Proofpoint Security Awareness", "Cybersecurity education and threat-driven awareness programs.", "Proofpoint", "https://www.proofpoint.com/us/products/security-awareness-training", ["security-training", "compliance"], { departments: ["security-awareness-training"] }),
  createService("604", "Terranova Security", "Security awareness and compliance training (Fortra).", "Fortra", "https://terranovasecurity.com", ["security-training", "compliance"], { departments: ["security-awareness-training"], slug: "terranova-security" }),

  // Health & safety
  createService("701", "EcoOnline EHS", "Environmental, health, and safety management software.", "EcoOnline", "https://www.ecoonline.com", ["ehs", "compliance"], { departments: ["health-safety"] }),
  createService("702", "Intelex EHSQ", "EHSQ management for incidents, audits, and regulatory compliance.", "Intelex", "https://www.intelex.com", ["ehs", "quality"], { departments: ["health-safety"] }),
  createService("703", "VelocityEHS", "EHS software for chemical management, audits, and reporting.", "VelocityEHS", "https://www.velocityehs.com", ["ehs", "safety"], { departments: ["health-safety"] }),
  createService("704", "CorityOne", "Integrated EHS and sustainability platform (Cority).", "Cority", "https://www.cority.com", ["ehs", "sustainability"], { departments: ["health-safety"], slug: "corityone" }),

  // Compliance platforms
  createService("801", "ServiceNow GRC", "Governance, risk, and compliance workflows on the Now Platform.", "ServiceNow", "https://www.servicenow.com/products/governance-risk-and-compliance.html", ["grc", "risk"], { departments: ["compliance-platforms", "legal"] }),
  createService("802", "OneTrust", "Privacy, GRC, and trust management for global compliance programs.", "OneTrust", "https://www.onetrust.com", ["privacy", "grc"], { departments: ["compliance-platforms", "legal"] }),
  createService("803", "ISMS.online", "ISO 27001 and information security management system platform.", "Alliantist", "https://www.isms.online", ["isms", "iso27001"], { departments: ["compliance-platforms"] }),

  // Generative AI
  createService("901", "ChatGPT", "Conversational AI assistant for writing, analysis, and automation.", "OpenAI", "https://chat.openai.com", ["genai", "llm", "chatbot"], { category: "AI" }),
  createService("902", "Claude", "AI assistant focused on safe, capable reasoning and long-context tasks.", "Anthropic", "https://claude.ai", ["genai", "llm"], { category: "AI" }),
  createService("903", "Google Gemini", "Multimodal AI from Google for search, docs, and developer APIs.", "Google", "https://gemini.google.com", ["genai", "llm", "multimodal"], { category: "AI", slug: "google-gemini" }),
  createService("904", "Microsoft Copilot", "AI copilot across Microsoft 365, Windows, and GitHub.", "Microsoft", "https://copilot.microsoft.com", ["genai", "productivity"], { category: "AI", slug: "microsoft-copilot" }),
  createService("905", "GitHub Copilot", "AI pair programmer for code completion and developer workflows.", "GitHub", "https://github.com/features/copilot", ["genai", "code"], { category: "AI" }),
  createService("906", "Midjourney", "Generative AI for high-quality image creation from text prompts.", "Midjourney", "https://www.midjourney.com", ["genai", "images"], { category: "AI" }),
  createService("907", "Adobe Firefly", "Generative AI for images and design inside Creative Cloud.", "Adobe", "https://www.adobe.com/products/firefly.html", ["genai", "images", "design"], { category: "AI" }),
  createService("908", "Perplexity", "AI search with cited answers and research-style responses.", "Perplexity AI", "https://www.perplexity.ai", ["genai", "search"], { category: "AI" }),
  createService("909", "Stable Diffusion", "Open image generation models and APIs for creative workflows.", "Stability AI", "https://stability.ai", ["genai", "images", "open-source"], { category: "AI" }),
  createService("910", "Amazon Bedrock", "Managed foundation models and agents on AWS.", "AWS", "https://aws.amazon.com/bedrock/", ["genai", "llm", "cloud"], { category: "AI" }),
  createService("911", "Azure OpenAI Service", "OpenAI models with enterprise security on Microsoft Azure.", "Microsoft", "https://azure.microsoft.com/products/ai-services/openai-service", ["genai", "llm", "enterprise"], { category: "AI", slug: "azure-openai" }),
  createService("912", "Jasper", "Generative AI marketing copilot for brand content at scale.", "Jasper", "https://www.jasper.ai", ["genai", "marketing"], { category: "AI" }),

  // IaaS — additional providers
  createService("1001", "IBM Cloud", "Enterprise cloud with compute, storage, Kubernetes, and AI services.", "IBM", "https://www.ibm.com/cloud", ["compute", "kubernetes", "enterprise"], { category: "IaaS" }),
  createService("1002", "Oracle Cloud Infrastructure", "High-performance cloud with VMs, networking, databases, and bare metal.", "Oracle", "https://www.oracle.com/cloud/", ["compute", "vms", "networking"], { category: "IaaS", slug: "oracle-cloud-infrastructure" }),
  createService("1003", "HPE GreenLake", "Edge-to-cloud platform delivering infrastructure as a service with pay-per-use.", "Hewlett Packard Enterprise", "https://www.hpe.com/greenlake", ["hybrid-cloud", "infrastructure", "edge"], { category: "IaaS", slug: "hpe-greenlake" }),
  createService("1004", "DigitalOcean", "Developer-friendly cloud with simple VMs, Kubernetes, and managed databases.", "DigitalOcean", "https://www.digitalocean.com", ["compute", "droplets", "kubernetes"], { category: "IaaS" }),
  createService("1005", "Linode", "Cloud compute and networking for developers, now part of Akamai.", "Akamai", "https://www.linode.com", ["compute", "vms", "networking"], { category: "IaaS", slug: "linode-akamai" }),
  createService("1006", "Vultr", "Global cloud infrastructure with VMs, bare metal, and GPU instances.", "Vultr", "https://www.vultr.com", ["compute", "bare-metal", "gpu"], { category: "IaaS" }),
  createService("1007", "Scaleway", "European cloud provider with instances, Kubernetes, and object storage.", "Scaleway", "https://www.scaleway.com", ["compute", "europe", "kubernetes"], { category: "IaaS" }),
];
