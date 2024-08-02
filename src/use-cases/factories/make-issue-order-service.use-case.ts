import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { PrismaSchedulingRepository } from "../../repositories/prisma/prisma-scheduling-repository";
import { IssueServiceUseCases } from "../issue-order-service.use-case";

export function MakeIssueOrderServiceUseCase() {
    const schedulingRepository = new PrismaSchedulingRepository()
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const issueServiceUseCase = new IssueServiceUseCases(orderServiceRepository, schedulingRepository)
    return issueServiceUseCase
}