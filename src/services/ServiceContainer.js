import ApiRepository from "./ApiRepository";
import getAllItemsByUserIdUseCase from "@/domain/useCases/GetAllItemsByUserIdUseCase";

class DependencyContainer {
  constructor() {
    this.repository = new ApiRepository();
    this.getAllItems = new getAllItemsByUserIdUseCase(this.repository);
  }

  getGetAllItems() {
    return this.getAllItems;
  }
}

export const container = new DependencyContainer();
