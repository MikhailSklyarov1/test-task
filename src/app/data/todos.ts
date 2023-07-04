import { ITask } from '../models/task';

export const defaultItems: ITask[] = [
  {
    id: 1,
    title: "Модификация к лр 4",
    text: "Найти пары слов, не имеющие между собой ни одной общей буквы",
    created: new Date('07/07/2023 09:23'),
    deadline: new Date('08/08/2023 09:23'),
  },
  {
    id: 2,
    title: "Мод лр 5",
    text: "Решите задачу с ограничениями: используйте функцию int equalWords(const char str[81], char word_groups[10][10][21]);",
    created: new Date('06/06/2023 09:23'),
    deadline: new Date('09/07/2023 09:23'),
  },
  {
    id: 3,
    title: 'Практика',
    text: 'Выполнить сортировку вставками',
    created: new Date('05/07/2023 09:23'),
    deadline: new Date('06/07/2023 09:23'),
  },
  {
    id: 4,
    title: "Оценить сложность алгоритма",
    text: "Алгоритм бинарного поиска",
    created: new Date('04/07/2023 09:23'),
    deadline: new Date('05/07/2023 23:50'),
  },
  {
    id: 5,
    title: 'лаб работа 6',
    text: "В строке найдите группы слов, имеющие одинаковый состав букв",
    created: new Date('03/07/2023 09:23'),
    deadline: new Date('09/09/2023 09:23'),
  }
];
