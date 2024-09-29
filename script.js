document.addEventListener('DOMContentLoaded', () => {
    const mealForm = document.getElementById('mealForm');
    const mealTable = document.getElementById('mealTable').getElementsByTagName('tbody')[0];
    const mealModal = document.getElementById('mealModal');

    window.openModal = function() {
        mealModal.classList.remove('hidden');
    };

    window.closeModal = function() {
        mealModal.classList.add('hidden');
        mealForm.reset();
    };

    window.addMeal = function() {
        const date = document.getElementById('date').value;
        const day = document.getElementById('day').value;
        const meal = document.getElementById('meal').value;
        const time = document.getElementById('time').value;

        const meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.push({ date, day, meal, time });
        localStorage.setItem('meals', JSON.stringify(meals));

        closeModal();
        renderTable();
    };

    window.deleteMeal = function(index) {
        const meals = JSON.parse(localStorage.getItem('meals'));
        meals.splice(index, 1);
        localStorage.setItem('meals', JSON.stringify(meals));
        renderTable();
    };

    window.editMeal = function(index) {
        const meals = JSON.parse(localStorage.getItem('meals'));
        const meal = meals[index];

        document.getElementById('date').value = meal.date;
        document.getElementById('day').value = meal.day;
        document.getElementById('meal').value = meal.meal;
        document.getElementById('time').value = meal.time;

        meals.splice(index, 1);
        localStorage.setItem('meals', JSON.stringify(meals));
        renderTable();
        openModal();
    };

    function renderTable() {
        mealTable.innerHTML = '';
        const meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.forEach((meal, index) => {
            const newRow = mealTable.insertRow();
            newRow.insertCell(0).textContent = meal.date;
            newRow.insertCell(1).textContent = meal.day;
            newRow.insertCell(2).textContent = meal.meal;
            newRow.insertCell(3).textContent = meal.time;
            newRow.insertCell(4).innerHTML = `
                <button onclick="editMeal(${index})" class="text-blue-600 hover:text-blue-900">Edit</button>
                <button onclick="deleteMeal(${index})" class="text-red-600 hover:text-red-900">Hapus</button>
            `;
        });
    }

    renderTable();
});
