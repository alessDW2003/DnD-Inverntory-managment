import ApiRepository from "./ApiRepository";
import getAllItemsByUserIdUseCase from "@/domain/useCases/GetAllItemsByUserIdUseCase";
import AddItemUseCase from "@/domain/useCases/AddItemUseCase";

class DependencyContainer {
  constructor() {
    this.repository = new ApiRepository();
    this.getAllItems = new getAllItemsByUserIdUseCase(this.repository);
    this.addItem = new AddItemUseCase(this.repository);
  }

  getGetAllItems() {
    return this.getAllItems;
  }

  getAddItemUseCase() {
    return this.addItem;
  }
}

export const container = new DependencyContainer();
