export interface Experience {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    currentlyWork: boolean
    city?: string
    state?: string
    description: string
    bulletPoints: string[]
}

export interface Education {
    id: string
    school: string
    degree: string
    period: string
}

export interface PersonalDetails {
    name: string
    role: string
    location: string
    email: string
    phone: string
    url: string
}

export interface Skill {
    id: string
    name: string
}

export interface ResumeData {
    personalDetails: PersonalDetails
    about: string
    experiences: Experience[]
    education: Education[]
    skills: Skill[]
}
