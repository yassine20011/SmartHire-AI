import Candidate from "#models/candidate";

export class CandidateService {
  static async  createCandidate(data: Partial<Candidate>) {
    try {
      const candidate = await Candidate.create(data);
      return candidate;
    } catch (error) {
      console.error("Error creating candidate:", error);
      throw new Error("Failed to create candidate");
    }
  }
}
