(() => {
    // Создаём пустой массив, в который будут добавляться студенты
    arrStudents = [];    
    
    // Получаем текущую дату
    let currentDate = new Date();
    // Преобразовываем текущую дату в формат YYYY-MM-DD
    let currentYear = currentDate.getFullYear();
    let currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы начинаются с 0
    let currentDay = currentDate.getDate().toString().padStart(2, '0');
    let formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    // Создаём форму для добавления нового студента
    let formAddStudent = document.createElement('form');
    let blockName = document.createElement('div');
    let blockSurname = document.createElement('div');
    let blockMiddleName = document.createElement('div');
    let blockDateBirth = document.createElement('div');
    let blockYearStartEducation = document.createElement('div');
    let blockFaculty = document.createElement('div');
    let inputName = document.createElement('input');
    let inputSurname = document.createElement('input');
    let inputMiddleName = document.createElement('input');
    let inputDateBirth = document.createElement('input');
    let inputYearStartEducation = document.createElement('input');
    let inputFaculty = document.createElement('input');
    let btnAddStudent = document.createElement('button');
  
    formAddStudent.classList.add('form');
    blockName.classList.add('form-group');
    blockSurname.classList.add('form-group');
    blockMiddleName.classList.add('form-group');
    blockDateBirth.classList.add('form-group');
    blockYearStartEducation.classList.add('form-group');
    blockFaculty.classList.add('form-group');
    inputName.classList.add('form-control');
    inputSurname.classList.add('form-control');
    inputMiddleName.classList.add('form-control');
    inputDateBirth.classList.add('form-control');
    inputYearStartEducation.classList.add('form-control');
    inputFaculty.classList.add('form-control');
    btnAddStudent.classList.add('btn', 'btn-primary');
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
    btnAddStudent.type = 'submit';
    btnAddStudent.textContent = 'Добавить';

    blockName.append(inputName);
    blockSurname.append(inputSurname);
    blockMiddleName.append(inputMiddleName);
    blockDateBirth.append(inputDateBirth);
    blockYearStartEducation.append(inputYearStartEducation);
    blockFaculty.append(inputFaculty);
    formAddStudent.append(blockName, blockSurname, blockMiddleName, blockDateBirth, blockYearStartEducation, blockFaculty, btnAddStudent);
    document.body.append(formAddStudent);
    
    // Создаём таблицу студентов
    let titleTable = document.createElement('h2');
    titleTable.textContent = 'Список студентов';
    titleTable.classList.add('text-muted');

    let tableStudents = document.createElement('table');
    let thead = document.createElement('thead');
    let trThead = document.createElement('tr');
    let thFullName = document.createElement('th');
    let thFaculty = document.createElement('th');
    let thDateBirthAge = document.createElement('th');
    let thYearEducationCourse = document.createElement('th');
    let tbody = document.createElement('tbody');
     
    tableStudents.classList.add('table', 'table-bordered');

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
        // создаём ячейки
        let trNewStudent = document.createElement('tr');
        let tdFullName = document.createElement('td');
        let tdFaculty = document.createElement('td');
        let tdDateBirthAge = document.createElement('td');
        let tdYearEducationCourse = document.createElement('td');

        // Вычисляем возраст студента
        let now = new Date(); //Текущя дата
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
        let dob = new Date(studentsArray[index].dateBirth); //Дата рождения
        let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
        let ageStudent = today.getFullYear() - dob.getFullYear(); //Возраст = текущий год - год рождения        
        //Если ДР в этом году ещё предстоит, то вычитаем из age один год
        if (today < dobnow) {
            ageStudent = ageStudent - 1;
        };

        // Приводим дату рождения в нужный нам формат
        let dataBirth = studentsArray[index].dateBirth;
        // Разбиваем строку на части (год, месяц, день)
        let parts = dataBirth.split("-");
        // Создаем новую дату в нужном формате
        let formattedDataBirth = parts[2] + "." + parts[1] + "." + parts[0];

        // добавляем контент в ячейки
        tdFullName.textContent = `${studentsArray[index].surname} ${studentsArray[index].name} ${studentsArray[index].middleName}`;
        tdFaculty.textContent = studentsArray[index].faculty;        
        tdDateBirthAge.textContent = `${formattedDataBirth} (${ageStudent} лет)`;
        if (studentsArray[index].yearStartEducation <= currentYear - 4) {
            tdYearEducationCourse.textContent = `${studentsArray[index].yearStartEducation}-${studentsArray[index].yearStartEducation + 4} (закончил)`;
        } else {
            tdYearEducationCourse.textContent = `${studentsArray[index].yearStartEducation}-${currentYear} (${currentYear - studentsArray[index].yearStartEducation + 1} курс)`;
        };

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
        if (!inputName.value.trim() || !inputSurname.value.trim() || !inputDateBirth.value || !inputYearStartEducation.value || !inputFaculty.value.trim()) {                
            return;
        };

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
        let formattedDateBirth = `${birthYear}-${birthMonth}-${birthDay}`;

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