import Recruiter from "#models/recruiter";

export class RecruiterService {
   static async createRecruiter(data: Partial<Recruiter>) {
     try {
       const recruiter = await Recruiter.create(data);
       return recruiter;
     }
      catch (error) {
        console.error("Error creating recruiter:", error);
        throw new Error("Failed to create recruiter");
      }
   }
}
