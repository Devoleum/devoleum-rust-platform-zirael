import { IHistory } from '../models/IHistory';
import { IStep } from '../models/ISteps';
import { getIterate } from '../utils/fetchData';

interface Props {
  url: string;
  type: 'history' | 'step';
  setItems: (items: IHistory[] | IStep[]) => void;
  setError: (error: any) => void;
  setLoading: (loading: boolean) => void;
}

export const getItems = async ({
  url,
  type,
  setItems,
  setError,
  setLoading,
}: Props) => {
  try {
    const resp = await fetch(url);
    const result = await resp.json();
    switch (type) {
      case 'history':
        const histories = (await getIterate(result, true)) as IHistory[];
        setItems(histories);
        break;
      case 'step':
        const steps = (await getIterate(result)) as IStep[];
        setItems(steps);
        break;
      default:
        break;
    }
  } catch (error) {
    setError(error);
  }
  setLoading(false);
};
