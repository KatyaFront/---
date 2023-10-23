(() => {
    // Создаём пустой массив, в который будут добавляться студенты
    arrStudents = [];    
    
    // Получаем текущую дату
    let currentDate = new Date();
    // Преобразовываем текущую дату в формат YYYY-MM-DD
    let currentYear = currentDate.getFullYear();
    let currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы начинаются с 0
    let currentDay = currentDate.getDate().toString().padStart(2, '0');
    let formattedCurrentDate = `${currentDay}.${currentMonth}.${currentYear}`;

    // Создаём форму для добавления нового студента
    let formAddStudent = document.createElement('form');
    let inputName = document.createElement('input');
    let inputSurname = document.createElement('input');
    let inputMiddleName = document.createElement('input');
    let inputDateBirth = document.createElement('input');
    let inputYearStartEducation = document.createElement('input');
    let inputFaculty = document.createElement('input');
    let btnAddStudent = document.createElement('button');

    inputName.placeholder = 'Имя';
    inputSurname.placeholder = 'Фамилия';
    inputMiddleName.placeholder = 'Отчество';
    inputDateBirth.placeholder = 'Дата рождения';
    inputDateBirth.type = 'date';
    inputDateBirth.min = '1900-01-01';
    inputDateBirth.max = formattedCurrentDate;
    inputYearStartEducation.placeholder = 'Год начала обучения';
    inputYearStartEducation.type = 'number';
    inputYearStartEducation.min = '2000';
    inputYearStartEducation.max = currentYear;
    inputFaculty.placeholder = 'Факультет';
    btnAddStudent.textContent = 'Добавить';

    formAddStudent.append(inputName, inputSurname, inputMiddleName, inputDateBirth, inputYearStartEducation, inputFaculty, btnAddStudent);
    document.body.append(formAddStudent);
    
    // Создаём таблицу студентов
    let titleTable = document.createElement('h2');
    titleTable.textContent = 'Список студентов';

    let tableStudents = document.createElement('table');
    let thead = document.createElement('thead');
    let trThead = document.createElement('tr');
    let thFullName = document.createElement('th');
    let thFaculty = document.createElement('th');
    let thDateBirthAge = document.createElement('th');
    let thYearEducationCourse = document.createElement('th');
    let tbody = document.createElement('tbody');

    thFullName.textContent = 'ФИО студента';
    thFaculty.textContent = 'Факультет';
    thDateBirthAge.textContent = 'Дата рождения/возраст';
    thYearEducationCourse.textContent = 'Годы обучения/курс';

    trThead.append(thFullName, thFaculty, thDateBirthAge, thYearEducationCourse);
    thead.append(trThead);
    tableStudents.append(thead, tbody);
    document.body.append(titleTable, tableStudents);    

    // Создаём функцию, которая возвращает строку с новым студентом
    function getNewStudentItem(studentsArray, index) {
        let trNewStudent = document.createElement('tr');
        let tdFullName = document.createElement('td');
        let tdFaculty = document.createElement('td');
        let tdDateBirthAge = document.createElement('td');
        let tdYearEducationCourse = document.createElement('td');

        // Вычисляем возраст студента
        // let now = new Date(); //Текущя дата
        // let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
        // let dob = studentsArray[index].dateBirth; //Дата рождения
        // let dobnow = new Date(currentYear, dob.getMonth(), dob.getDate()); //ДР в текущем году
        // let ageStudent = currentYear - dob.getFullYear(); //Возраст
        // //Если ДР в этом году ещё предстоит, то вычитаем из ageStudent один год
        // if (formattedCurrentDate < dobnow) {
        //     ageStudent = ageStudent - 1;
        // };

        let ageStudent = formattedCurrentDate - studentsArray[index].dateBirth;

        tdFullName.textContent = `${studentsArray[index].surname} ${studentsArray[index].name} ${studentsArray[index].middleName}`;
        tdFaculty.textContent = studentsArray[index].faculty;
        tdDateBirthAge = `${studentsArray[index].dateBirth} (${ageStudent} лет)`;
        tdYearEducationCourse = `${studentsArray[index].yearStartEducation}-${currentYear} (${currentYear - studentsArray[index].yearStartEducation} курс)`;

        trNewStudent.append(tdFullName, tdFaculty, tdDateBirthAge, tdYearEducationCourse);
        
        return trNewStudent;
    };

    // Создание функции добавления в таблицу строки с данными, хранящимися в массивах с помощью цикла. Цикл будет действовать всякий раз, когда мы вносим изменения в наш список
    function render(arrayStudents) {
        tbody.innerHTML = "" // Очищаем прошлый список
        // Создаем цикл, если индекс элемента меньше, чем количество элементов, то создается переменная, в которую присваивается вызов функции создания строки. И этот элемент (строка) добавляется в таблицу
        for (let i = 0; i < arrayStudents.length; i++) {
            let newStudentItem = getNewStudentItem(arrayStudents, i);
            tbody.append(newStudentItem);
        };
    };

    // Добавляем обработчик события на форму (по нажатию на кнопку, данные из формы будут добавляться в массив и будет формирваться строка в таблице с новым студентом)
    formAddStudent.addEventListener('submit', (e) => {
        // предотвращаем перезагрузку страницы при отправке формы
        e.preventDefault();

        // игнорируем создание элемента, если пользователь ничего не ввёл хотябы в одно поле (кроме отчества)
        // if (!NameValue || !SurnameValue || !dateBirthValue || !yearStartEducationValue || !facultyValue) {                
        //     return;
        // };

        // Создаём переменные с обработанными данными из полей ввода
        let NameValue = inputName.value.trim();
        let SurnameValue = inputSurname.value.trim();
        let middleNameValue = inputMiddleName.value.trim();
        let dateBirthValue = new Date(inputDateBirth.value);
        let yearStartEducationValue = Number(inputYearStartEducation.value);
        let facultyValue = inputFaculty.value.trim();

         // Преобразовываем дату рождения в формат DD.MM.YYYY
        let birthYear = dateBirthValue.getFullYear();
        let birthMonth = (dateBirthValue.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы начинаются с 0
        let birthDay = dateBirthValue.getDate().toString().padStart(2, '0');
        let formattedDateBirth = `${birthDay}.${birthMonth}.${birthYear}`;

        // Добавление созданных элементов в массив
        arrStudents.push({
            name: NameValue,
            surname: SurnameValue,
            middleName: middleNameValue,
            dateBirth: formattedDateBirth,
            yearStartEducation: yearStartEducationValue,
            faculty: facultyValue,
        });

        // Запускаем функцию, когда добавляем нового пользователя, эта функция будет делать итерации добавления нового пользователя
        render(arrStudents);

        // Очищение полей
        inputName.value = '';
        inputSurname.value = '';
        inputMiddleName.value = '';
        inputDateBirth.value = '';
        inputYearStartEducation.value = '';
        inputFaculty.value = '';
    });
    
})();