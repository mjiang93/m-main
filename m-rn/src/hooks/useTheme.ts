import {useAppSelector} from '@hooks/index';
import {getTheme} from '@config/theme';

const useTheme = () => {
  const isDarkMode = useAppSelector(state => state.app.isDarkMode);
  return getTheme(isDarkMode);
};

export default useTheme;