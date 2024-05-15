import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import styles from "../../pages/Calculation/Calculation.module.scss";
import TextField from "@mui/material/TextField";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { fetchProducts, selectIsProductsLoaded, selectProducts} from "../../redux/slices/products";

import {fetchjournals, selectIsjournalsLoaded, selectjournals} from "../../redux/slices/journal";


export const Calculation = () => {
  const dispatch = useDispatch();
  const isProductsLoaded = useSelector(selectIsProductsLoaded);
  const isjournalsLoaded = useSelector(selectIsjournalsLoaded);
  const products = useSelector(selectProducts);
  const journals = useSelector(selectjournals);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  
  const [selectedProductValue, setSelectedProductValue] = useState(""); // Выбранный продукт
  const [selectedWeight, setSelectedWeight] = useState(""); 
  const [todayProducts, setTodayProducts] = useState([]);
  const [selectedOptionsNutrition, setSelectedOptionsNutrition] = useState({
    "набор массы": { calories: 2000, protein: 150, fat: 70, carbohydrates: 250 },
    "норма": { calories: 1800, protein: 100, fat: 60, carbohydrates: 200 },
    "похудение": { calories: 1500, protein: 80, fat: 50, carbohydrates: 150 }
  });
  const [isDietSelected, setIsDietSelected] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    diet1: false,
    diet2: false,
    diet3: false,
  });
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchjournals());
  }, [dispatch]);

  useEffect(() => {
    const totalProductNutrition = todayProducts.reduce((acc, product) => {
        return {
            calories: acc.calories + product.calories,
            protein: acc.protein + product.protein,
            fat: acc.fat + product.fat,
            carbohydrates: acc.carbohydrates + product.carbohydrates
        };
    }, { calories: 0, protein: 0, fat: 0, carbohydrates: 0 });

    const data = {
        labels: ["Калории", "Белки", "Жиры", "Углеводы"],
        datasets: [
            {
                label: "КБЖУ",
                data: [totalProductNutrition.calories, totalProductNutrition.protein, totalProductNutrition.fat, totalProductNutrition.carbohydrates],
                backgroundColor: todayProducts.length > 0 ? [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                ] : "rgba(211,211,211,0.6)" // серый цвет, если todayProducts пуст
            },
        ],
    };
    setChartData(data);
}, [todayProducts]);

useEffect(() => {
  // Функция для проверки, выбран ли хотя бы один из чекбоксов
  const isAnyDietSelected = () => {
    // Проверяем состояние каждого чекбокса
    return Object.values(checkboxState).some(checked => checked);
  }

  // Проверяем, выбран ли хотя бы один из чекбоксов
  setIsDietSelected(isAnyDietSelected());
}, [checkboxState]);


const addProductToDatabase = async () => {
  try {
    setLoading(true);

    // Проверка наличия всех обязательных полей
    if (!name || !calories || !protein || !fat || !carbohydrates) {
      throw new Error('Пожалуйста, заполните все обязательные поля');
    }

    // Создание объекта с данными продукта
    const productData = {
      name,
      calories,
      protein,
      fat,
      carbohydrates,
    };

    // Выполнение POST-запроса на добавление продукта
    const { data } = await axios.post('/products', productData);

    alert("Продукт успешно добавлен");
    dispatch(fetchProducts());

  } catch (err) {
    console.warn(err);
    alert('Ошибка при добавлении продукта!');
  } finally {
    setLoading(false); // Устанавливаем loading в false в любом случае, чтобы скрыть индикатор загрузки
  }
};

const saveJournalEntryToDatabase = async () => {
  try {
    setLoading(true);

    if (!todayProducts.length) {
      throw new Error('Пожалуйста, добавьте хотя бы один продукт для сохранения');
    }

    // Суммируем значения калорий, белков, жиров и углеводов всех продуктов в массиве todayProducts
    const totalCalories = todayProducts.reduce((acc, product) => acc + product.calories, 0);
    const totalProtein = todayProducts.reduce((acc, product) => acc + product.protein, 0);
    const totalFat = todayProducts.reduce((acc, product) => acc + product.fat, 0);
    const totalCarbohydrates = todayProducts.reduce((acc, product) => acc + product.carbohydrates, 0);

   

    const journalEntry = {
      
      calories: totalCalories,
      protein: totalProtein,
      fat: totalFat,
      carbohydrates: totalCarbohydrates,
    };

    const response = await axios.post('/journals', journalEntry);

    const addedJournal = response.data;
   

    // Очищаем todayProducts после успешного сохранения
    setTodayProducts([]);

    // Очищаем поля ввода после успешного сохранения
    setName('');
    setCalories('');
    setProtein('');
    setFat('');
    setCarbohydrates('');
    alert("Ваша запись была успешно сохранена!");
    dispatch(fetchjournals());

  } catch (error) {
    console.error(error);
    alert('Ошибка при сохранении записи в журнал');
  } finally {
    setLoading(false);
  }
};

    const handleOptionChange = (option, e) => {
      const { name, checked } = e.target;
      setCheckboxState(prevState => ({
        ...prevState,
        [name]: checked
      }));
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
      };

  if (!isProductsLoaded) {
    return <div>Загрузка продуктов...</div>;
  }
   if(!isjournalsLoaded){
    return <div>Загрузка журнала...</div>;
   }

  // Функция для добавления продукта в таблицу today
  const handleAddProduct = () => {
    // Найдем выбранный продукт по его имени
    const selectedProduct = products.find(product => product.name === selectedProductValue);
  
    // Проверим, найден ли продукт и задан ли его вес
    if (selectedProduct && selectedWeight !== "") {
      // Добавим продукт с его весом и рассчитанными кБжУ в массив todayProducts
      setTodayProducts([...todayProducts, {
        name: selectedProduct.name,
        weight: selectedWeight,
        calories: Math.round(selectedProduct.calories * selectedWeight / 100), // рассчитаем калории
        protein: Math.round(selectedProduct.protein * selectedWeight / 100), // рассчитаем белки
        fat: Math.round(selectedProduct.fat * selectedWeight / 100), // рассчитаем жиры
        carbohydrates: Math.round(selectedProduct.carbohydrates * selectedWeight / 100), // рассчитаем углеводы
      }]);
      // Очистим комбобокс и поле веса
      setSelectedProductValue("");
      setSelectedWeight("");
    }
  };

  // Общие значения кБЖУ для продуктов из таблицы
  const totalProductNutrition = todayProducts.reduce((acc, product) => {
    return {
      calories: acc.calories + product.calories,
      protein: acc.protein + product.protein,
      fat: acc.fat + product.fat,
      carbohydrates: acc.carbohydrates + product.carbohydrates
    };
  }, { calories: 0, protein: 0, fat: 0, carbohydrates: 0 });


   // Функция для проверки, удовлетворяют ли кБЖУ из таблицы кБЖУ из чекбоксов
   const isNutritionSufficient = (option) => {
    const selectedNutrition = selectedOptionsNutrition[option];
    return (
      totalProductNutrition.calories <= selectedNutrition.calories &&
      totalProductNutrition.protein <= selectedNutrition.protein &&
      totalProductNutrition.fat <= selectedNutrition.fat &&
      totalProductNutrition.carbohydrates <= selectedNutrition.carbohydrates
    );
  };


 // Опции для отображения меток справа от диаграммы
 const chartOptions = {
  plugins: {
    legend: {
      position: "right",
      maxWidth:300,
      labels: {
        font: {
          size: 18 // Размер шрифта в пикселях
        },
        
        usePointStyle: true,
        generateLabels: function(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function(label, i) {
              const ds = data.datasets[0];
              const value = ds.data[i];
              return {
                text: `${label} - ${value}`,
                fillStyle: ds.backgroundColor[i],
              };
            });
          }
          return [];
        },
        // Увеличьте это значение по вашему усмотрению
        padding: 25,
       
      }
      
    }
  }
};

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('ru-RU', options);
};
    
  return (
    <div>
      <div className={styles.rejim}>{ !isDietSelected && <h2>Выберите режим питания</h2> }</div>
       <div className={styles.checkbox}>
      <label>
        <input type="checkbox" name="diet1" 
          checked={checkboxState.diet1}  onChange={(e) => handleOptionChange("набор массы", e)}/>
       набор массы
      </label>
      <label>
        <input type="checkbox" name="diet2" 
          checked={checkboxState.diet2}  onChange={(e) => handleOptionChange("норма", e)}/>
        норма
      </label>
      <label>
        <input type="checkbox" name="diet3" 
          checked={checkboxState.diet3}  onChange={(e) => handleOptionChange("похудение", e)}/>
        похудение
      </label>
     
    </div>
   
  

    

      
      <div className={styles.block_one}>
        <div className={styles.container_dg}>
          <div className={styles.die}>
          {selectedOptions.includes("похудение") && (
        <p>Вы выбрали режим "похудение".</p>
      )}
      {selectedOptions.includes("норма") && (
        <p>Вы выбрали режим "норма".</p>
      )}
      {selectedOptions.includes("набор массы") && (
        <p>Вы выбрали режим "набор массы".</p>
      )}
          </div>
        <div className={styles.block_three}>
     
      <div className={styles.vid}>
  {selectedOptions.includes("набор массы") && (
    <div>
     
      <p style={{ color: totalProductNutrition.calories <= selectedOptionsNutrition[selectedOptions].calories ? "green" : "red" }}>Калории: 2000</p>
      <p style={{ color: totalProductNutrition.protein <= selectedOptionsNutrition[selectedOptions].protein ? "green" : "red" }}>Белки: 150</p>
      <p style={{ color: totalProductNutrition.fat <= selectedOptionsNutrition[selectedOptions].fat ? "green" : "red" }}>Жиры: 70</p>
      <p style={{ color: totalProductNutrition.carbohydrates <= selectedOptionsNutrition[selectedOptions].carbohydrates ? "green" : "red" }}>Углеводы: 250</p>
    </div>
  )}
  {selectedOptions.includes("норма") && (
    <div>
      
      <p style={{ color: totalProductNutrition.calories <= selectedOptionsNutrition[selectedOptions].calories ? "green" : "red" }}>Калории: 1800</p>
      <p style={{ color: totalProductNutrition.protein <= selectedOptionsNutrition[selectedOptions].protein ? "green" : "red" }}>Белки: 100</p>
      <p style={{ color: totalProductNutrition.fat <= selectedOptionsNutrition[selectedOptions].fat ? "green" : "red" }}>Жиры: 60</p>
      <p style={{ color: totalProductNutrition.carbohydrates <= selectedOptionsNutrition[selectedOptions].carbohydrates ? "green" : "red" }}>Углеводы: 200</p>
    </div>
  )}
  {selectedOptions.includes("похудение") && (
    <div>
      
      <p style={{ color: totalProductNutrition.calories <= selectedOptionsNutrition[selectedOptions].calories ? "green" : "red" }}>Калории: 1500</p>
      <p style={{ color: totalProductNutrition.protein <= selectedOptionsNutrition[selectedOptions].protein ? "green" : "red" }}>Белки: 80</p>
      <p style={{ color: totalProductNutrition.fat <= selectedOptionsNutrition[selectedOptions].fat ? "green" : "red" }}>Жиры: 50</p>
      <p style={{ color: totalProductNutrition.carbohydrates <= selectedOptionsNutrition[selectedOptions].carbohydrates ? "green" : "red" }}>Углеводы: 150</p>
    </div>
  )}

  
</div>
      <div className={styles.dg} >
      <Doughnut data={chartData} options={chartOptions}/>
    </div>
       
      </div>
        </div>
      
      <div className={styles.conteiner_Journal}>
      <div>
          <table>
            <caption>ЖУРНАЛ</caption>
            <thead>
              <tr>
                <th>дата</th>
                <th>К</th>
                <th>Б</th>
                <th>Ж</th>
                <th>У</th>
              </tr>
            </thead>
            <tbody>
            {journals?.length > 0 &&
                  journals.map((journal) => (
                    <tr key={journal._id}>
                      <td>{formatDate(journal.date)}</td>
                      <td>{journal.calories}</td>
                      <td>{journal.protein}</td>
                      <td>{journal.fat}</td>
                      <td>{journal.carbohydrates}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      <div className={styles.block_two}>
        
        <div className={styles.container_writer}>
        <div className={styles.vibor}>
            <select className={styles.combo} value={selectedProductValue} onChange={(e) => setSelectedProductValue(e.target.value)}>
            <option value="">Выберите продукт</option>
              {products?.length > 0 &&
                  products.map((product) => (
                    <option key={product.id} value={product.name}>{product.name}</option>
                  ))}
                  
            </select>
            <input type="number" value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)} placeholder="вес(г.)" className={styles.ves}/>
            <button className={styles.plus} onClick={handleAddProduct}>+</button>
          </div>
          <div>
            <table>
              <caption>СЕГОДНЯ</caption>
              <thead>
                <tr>
                  <th>наименование</th>
                  <th>вес(г.)</th>
                 
                </tr>
              </thead>
              <tbody>
  {todayProducts.map((product, index) => (
    <tr key={index}>
      <td>{product.name}</td>
      <td>{product.weight}</td>
    
    </tr>
  ))}
  <button className={styles.prod_save_2} onClick={saveJournalEntryToDatabase}>Сохранить</button>
</tbody>
            </table>
          </div>
          
        </div>

        <div className={styles.container_prod}>
          <div>
            <table>
              <caption>ПРОДУКТЫ</caption>
              <thead>
                <tr>
                  <th>Наименование</th>
                  <th>Каллории</th>
                  <th>Белки</th>
                  <th>Жиры</th>
                  <th>Углеводы</th>
                </tr>
              </thead>
              <tbody>
                {products?.length > 0 &&
                  products.map((product) => (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.calories}</td>
                      <td>{product.protein}</td>
                      <td>{product.fat}</td>
                      <td>{product.carbohydrates}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className={styles.add_prod}>
            <TextField value={name}  onChange={(e) => setName(e.target.value)} className={styles.field} variant="standard" placeholder="Наименование продукта" />
            <TextField value={calories}  onChange={(e) => setCalories(e.target.value)} className={styles.field_number} variant="standard" placeholder="ккал/100г." />
            <div>
            <TextField value={protein}  onChange={(e) => setProtein(e.target.value)} className={styles.field_number} variant="standard" placeholder="белки" />
            <TextField value={fat}  onChange={(e) => setFat(e.target.value)} className={styles.field_number} variant="standard" placeholder="жиры" />
            <TextField value={carbohydrates}  onChange={(e) => setCarbohydrates(e.target.value)} className={styles.field_number} variant="standard" placeholder="углеводы" />
           
            </div>
            <button className={styles.prod_save} onClick={() => addProductToDatabase()}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};
