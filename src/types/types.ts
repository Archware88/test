export interface IInstructorCreateData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
  age?: number;
  gender?: string;
  location?: string;
  expectation?: string;
}


  export interface IInstructorInfo {
  firstname: string;
  lastname: string;
  profile_picture?: string ;
  id: number;
  specialty: string;
  course_creation_time: string;
  currentEmployer?: {
    organization: string;
    jobtitle: string;
    instructor_id: number;
  };
  previousEmployer?: {
    organization: string;
    jobtitle: string;
    instructor_id: number;
  };
}

export interface IPaginatedCourses {
  current_page: number;
  data: ICourse[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}



export interface IUserResponse {
  status: boolean;
  message: string;
  role: string;
  token?: string;
  errors?: Record<string, string[]>; // For validation errors
}

export interface IUserCreateData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
  age?: number;
  gender?: string;
  location?: string;
  expectation?: string;
  preferredoccupation?: string;
  workexperience?: string;
  education?: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}


export interface IProfileInfo {
  firstname: string;
  lastname: string;
  email: string;
  gender?: string;
  phonenumber?: string;
  age?: number;
  profile_picture?: string;
  about?: string;
  preferredoccupation?: string;
  workexperience?: string;
  education?: string;
}



export interface ICourse {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructors?: string;
  total_cost?: number;
  rating?: number;
  image?: string;
  authors?: string[];
  reviews?: number;
  status?: "New" | "Best Seller" | "Top Rated" | "Top Teacher";
  student_count?: number;
  data: string;
  courseprices?: { course_price: number }[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IUserUpdateData {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  phonenumber?: string;
  gender?: string;
  location?: string;
  age?: number;
  expectation?: string;
  preferredoccupation?: string;
  workexperience?: string;
  education?: string;
  profile_picture?: string;
}

// In types.ts

export interface ICourseInfo {
  id: number;
  title: string;
  subtitle: string;
  video: string;
  image: string;
  status: string;
  instructor_id: number;
}

export interface ILesson {
  title: string;
  video: string;
  note: string;
  resource: string;
  lesson_id: number;
  section_id: number;
}

export interface ISection {
  section_id: number;
  name: string;
  lesson: ILesson[];
}

export interface ICourseDetailsResponse {
  curriculum_id: number | null;
  profile_info: IProfileInfo;
  course_info: ICourseInfo;
  curriculum_details: ISection[];
}

