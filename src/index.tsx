import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	const [articleStateApp, setArticleStateApp] = useState(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		console.log('Стили', newState);
		setArticleStateApp(newState);
	};

	const handleReset = () => {
		console.log('Брос стилей');
		setArticleStateApp(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStateApp.fontFamilyOption.value,
					'--font-size': articleStateApp.fontSizeOption.value,
					'--font-color': articleStateApp.fontColor.value,
					'--container-width': articleStateApp.contentWidth.value,
					'--bg-color': articleStateApp.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} onReset={handleReset} initialState={articleStateApp}  />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
