import { useEffect, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

//Пропсы для компанента ArticleParamsFormProps
type TArticleParamsFormProps = {
	onApply: (articleState: ArticleStateType) => void; // Колбэк при нажатии на кнопку "Применить"
	onReset: () => void; // Колбэк при нажатии на кнопку "Сбросить"
	initialState: ArticleStateType; // Новый пропс для начального состояния
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
	initialState, // Принимаем начальное состояние
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false); // Состояние открытия/закрытия формы
	const [formState, setFormState] = useState(initialState); // Инициализируем состояние формы переданным initialState
	const asideRef = useRef<HTMLDivElement>(null); // Ref для сайдбара, чтобы отслеживать клики вне его области

	// Обработчик открытия/закрытия сайдбара
	const toggleSidebar = () => {
		setIsOpen(!isOpen); //Установка нового значения isOpen на противоложное текущему
	};

	useEffect(() => {
		// Ф-ция поверяет, был ли клик вне сайдбаре
		const handleClickOutside = (e: MouseEvent) => {
			// Если сайдбар существуе(asideRef.current) и клик был вне его области
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				//Закрытие сайдбара, устанавливая  setIsOpen в false
				setIsOpen(false);
			}
		};

		// Добавление обработчика события
		document.addEventListener('mousedown', handleClickOutside);

		// Удаляем обработчик при размонтировании компанента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	//Обработчик изменение значений в форме
	const handleChange = (field: keyof ArticleStateType, value: OptionType) => {
		setFormState((prevState) => ({
			...prevState, //Копирование предыдущего состояние
			[field]: value, // Обновление конкретного поля
		}));
	};

	// Обработчик применения настроек
	const handleApply = () => {
		onApply(formState);
	};

	// Обработчик сброса настроек
	const handlyReset = () => {
		setFormState(defaultArticleState); // Сброс состояния формы к начальным значения
		onReset();
	};

	return (
		<div ref={asideRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text
						uppercase={true}
						as={'h2'}
						size={31}
						weight={800}
						align={'left'}
						fontStyle={'normal'}
						family={'open-sans'}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title='Шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						title='Цвет шрифта'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handlyReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
