import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type !== 'outcome') {
      const income = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return income;
    }

    const { total } = this.transactionsRepository.getBalance();

    if (value > total) {
      throw new Error('Você não possui este valor em sua conta.');
    }

    const income = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return income;
  }
}

export default CreateTransactionService;
