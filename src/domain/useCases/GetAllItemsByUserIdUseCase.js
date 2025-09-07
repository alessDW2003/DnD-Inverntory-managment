export default class getAllItemsByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    const items = await this.repository.getAllItemsByUserId(userId);

    return items;
  }
}
