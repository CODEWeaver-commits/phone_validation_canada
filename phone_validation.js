function validateForm() {
    let form = event.target;
    let phoneInput = form.querySelector('.phone');

    let phoneValue = phoneInput.value.trim();
    let digitsOnly = phoneValue.replace(/\D/g, ''); // лише цифри

    // Канада: +1 (XXX) XXX-XXXX → 11 цифр (1 + 10 цифр)
    if (digitsOnly.length !== 11) {
        alert('Please enter the full phone number, including the area code.');
        return false;
    }

    // Список дійсних канадських area codes (основні)
    const validAreaCodes = [
        "204","226","236","249","250","289","306","343","365","403","416","418","431",
        "437","438","450","506","514","519","548","579","581","587","604","613","639",
        "647","672","705","709","742","778","780","782","807","819","825","867","873",
        "879","902","905"
    ];

    // Витягуємо area code з номера у форматі +1 (XXX) ...
    let areaCodeMatch = phoneValue.match(/\+1\s*\(?(\d{3})\)?/);

    if (areaCodeMatch && areaCodeMatch[1]) {
        let areaCode = areaCodeMatch[1];
        if (!validAreaCodes.includes(areaCode)) {
            alert('Invalid area code! Valid Canadian codes include: ' + validAreaCodes.join(', '));
            return false;
        }
    } else {
        alert('Please enter the number in the correct format: +1 (XXX) XXX-XXXX');
        return false;
    }

    // Пошук ідентифікаторів полів
    let num = form.querySelector('input[name^="tel"]').name.replace('tel', '') || 1;
    let name = form.querySelector('input[name^="name"]').name.replace('name', '') || '';

    sendorder(num);
    return false;
}
