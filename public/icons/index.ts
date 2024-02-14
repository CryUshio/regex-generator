import path from 'path';
import { CustomIconLoader, InlineCollection } from 'unplugin-icons';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

const customIcons: CustomIconLoader | InlineCollection = FileSystemIconLoader(path.resolve(__dirname, './svg'));

export default customIcons;
