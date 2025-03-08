const form = document.getElementById('registrationForm');
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.addEventListener('click', async (event) => {
            const formData = new FormData(form);
            try {
                const response = await fetch('/registro', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'enctype': 'multipart/form-data'
                    }
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    form.reset();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al registrar el usuario');
            }
        });