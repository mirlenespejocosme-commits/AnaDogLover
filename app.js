/* App JS - Albergue "Huellitas Felices" */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = (open) => {
        if (open) {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMobileMenu(false));
    mobileNavOverlay?.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) toggleMobileMenu(false);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });


    // ==========================================
    // 2. Navigation Active State on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 120; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // 3. Adoption Catalog Filtering
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dogCards = document.querySelectorAll('.dog-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active class on button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            dogCards.forEach(card => {
                const dogSize = card.getAttribute('data-size');
                
                // Add a smooth fading effect
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || dogSize === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });


    // ==========================================
    // 4. Adoption Modal Controller
    // ==========================================
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    const adoptionModal = document.getElementById('adoptionModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const adoptionForm = document.getElementById('adoptionForm');
    const adoptionSuccessView = document.getElementById('adoptionSuccessView');
    const closeAdoptionSuccessBtn = document.getElementById('closeAdoptionSuccessBtn');
    
    // Modal Dynamic Fields
    const modalDogImg = document.getElementById('modalDogImg');
    const modalDogName = document.getElementById('modalDogName');
    const modalDogBreed = document.getElementById('modalDogBreed');
    const successDogName = document.getElementById('successDogName');

    const openAdoptionModal = (dogName, dogBreed, dogImg) => {
        if (modalDogImg) modalDogImg.src = dogImg;
        if (modalDogImg) modalDogImg.alt = dogName;
        if (modalDogName) modalDogName.textContent = `Adoptar a ${dogName}`;
        if (modalDogBreed) modalDogBreed.textContent = dogBreed;
        if (successDogName) successDogName.textContent = dogName;

        // Reset form states
        adoptionForm?.classList.remove('hidden');
        adoptionSuccessView?.classList.add('hidden');
        adoptionForm?.reset();
        clearFormErrors(adoptionForm);

        adoptionModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeAdoptionModal = () => {
        adoptionModal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    adoptButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const dogName = btn.getAttribute('data-dog-name') || '';
            const dogBreed = btn.getAttribute('data-dog-breed') || '';
            const dogImg = btn.getAttribute('data-dog-img') || '';
            openAdoptionModal(dogName, dogBreed, dogImg);
        });
    });

    modalCloseBtn?.addEventListener('click', closeAdoptionModal);
    closeAdoptionSuccessBtn?.addEventListener('click', closeAdoptionModal);
    adoptionModal?.addEventListener('click', (e) => {
        if (e.target === adoptionModal) closeAdoptionModal();
    });


    // ==========================================
    // 5. Donation & Registration Interactive Form
    // ==========================================
    const donationForm = document.getElementById('donationForm');
    const customAmountGroup = document.getElementById('customAmountGroup');
    const customAmountInput = document.getElementById('custom_amount');
    const tierRadios = document.querySelectorAll('input[name="donation_tier"]');
    const donationSuccess = document.getElementById('donationSuccess');
    const resetDonationBtn = document.getElementById('resetDonationBtn');

    // Success elements
    const thankYouName = document.getElementById('thankYouName');
    const thankYouAmount = document.getElementById('thankYouAmount');
    const thankYouEmail = document.getElementById('thankYouEmail');

    // Handle Custom Amount Input Visibility
    tierRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'custom') {
                customAmountGroup?.classList.remove('hidden');
                customAmountInput?.setAttribute('required', 'true');
                customAmountInput?.focus();
            } else {
                customAmountGroup?.classList.add('hidden');
                customAmountInput?.removeAttribute('required');
                customAmountInput.value = '';
            }
        });
    });

    // Formatting Inputs (Card Formatting Helper)
    const cardNumberInput = document.getElementById('card_number');
    const cardExpiryInput = document.getElementById('card_expiry');
    const cardCvvInput = document.getElementById('card_cvv');

    cardNumberInput?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formatted = '';
        for (let i = 0; i < value.length && i < 16; i++) {
            if (i > 0 && i % 4 === 0) formatted += ' ';
            formatted += value[i];
        }
        e.target.value = formatted;
    });

    cardExpiryInput?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formatted = '';
        if (value.length > 0) {
            formatted = value.substring(0, 2);
            if (value.length > 2) {
                formatted += '/' + value.substring(2, 4);
            }
        }
        e.target.value = formatted;
    });

    cardCvvInput?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });

    // Form inputs focus styling helper
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement?.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement?.classList.remove('focused');
        });
    });


    // ==========================================
    // 6. Form Validations and Submissions
    // ==========================================
    
    // Clear error messages helper
    const clearFormErrors = (form) => {
        if (!form) return;
        const groups = form.querySelectorAll('.form-group');
        groups.forEach(group => group.classList.remove('invalid'));
    };

    // Helper to validate email format
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // ADOPTION FORM SUBMISSION
    adoptionForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFormErrors(adoptionForm);

        let isValid = true;
        
        const nameInput = document.getElementById('adopt_name');
        const emailInput = document.getElementById('adopt_email');
        const phoneInput = document.getElementById('adopt_phone');
        const expSelect = document.getElementById('adopt_experience');
        const reasonText = document.getElementById('adopt_reason');

        // Validation checks
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!isValidEmail(emailInput.value.trim())) {
            emailInput.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!phoneInput.value.trim()) {
            phoneInput.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!expSelect.value) {
            expSelect.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!reasonText.value.trim()) {
            reasonText.parentElement.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            // Obtener datos para WhatsApp
            const dogNameVal = successDogName ? successDogName.textContent : 'un perrito';
            const dogBreedVal = modalDogBreed ? modalDogBreed.textContent : '';
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const phoneVal = phoneInput.value.trim();
            
            let expVal = '';
            if (expSelect.value === 'yes') expVal = 'Sí, he tenido perritos antes';
            else if (expSelect.value === 'first') expVal = 'No, sería mi primer perrito';
            else expVal = 'Tengo otras mascotas actualmente';

            const reasonVal = reasonText.value.trim();

            // Construir el mensaje formateado para WhatsApp
            const message = `🐾 *Nueva Solicitud de Adopción - Huellitas Felices* 🐾\n\n` +
                            `🐶 *Perrito:* ${dogNameVal} (${dogBreedVal})\n\n` +
                            `👤 *Adoptante:* ${nameVal}\n` +
                            `✉️ *Email:* ${emailVal}\n` +
                            `📞 *Teléfono:* ${phoneVal}\n` +
                            `🏡 *Experiencia con mascotas:* ${expVal}\n\n` +
                            `📝 *Razón de adopción:*\n"${reasonVal}"`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/51927657100?text=${encodedMessage}`;

            // Abrir WhatsApp en una pestaña nueva
            window.open(whatsappUrl, '_blank');

            // Success! Transition forms in modal
            adoptionForm.classList.add('hidden');
            adoptionSuccessView.classList.remove('hidden');
        }
    });

    // DONATION FORM SUBMISSION
    donationForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFormErrors(donationForm);

        let isValid = true;

        const donorName = document.getElementById('donor_name');
        const donorEmail = document.getElementById('donor_email');
        const donorPhone = document.getElementById('donor_phone');
        const consentCheckbox = document.getElementById('consent');
        const cardNum = document.getElementById('card_number');
        const cardExp = document.getElementById('card_expiry');
        const cardCvv = document.getElementById('card_cvv');

        // Validate basic text fields
        if (!donorName.value.trim()) {
            donorName.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!isValidEmail(donorEmail.value.trim())) {
            donorEmail.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!donorPhone.value.trim()) {
            donorPhone.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!consentCheckbox.checked) {
            consentCheckbox.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        // Validate selected tier custom amount if applicable
        const selectedTier = document.querySelector('input[name="donation_tier"]:checked').value;
        let donationAmountValue = 0;

        if (selectedTier === 'custom') {
            const amountVal = parseFloat(customAmountInput.value);
            if (isNaN(amountVal) || amountVal < 5) {
                customAmountGroup.classList.add('invalid');
                isValid = false;
            } else {
                donationAmountValue = amountVal;
            }
        } else {
            donationAmountValue = parseFloat(selectedTier);
        }

        // Validate payment simulation card details
        if (cardNum.value.replace(/\s/g, '').length < 16) {
            cardNum.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExp.value)) {
            cardExp.parentElement.classList.add('invalid');
            isValid = false;
        }
        if (cardCvv.value.length < 3) {
            cardCvv.parentElement.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            // 1. Update text in success view
            if (thankYouName) thankYouName.textContent = donorName.value.trim().split(' ')[0]; // First name
            if (thankYouEmail) thankYouEmail.textContent = donorEmail.value.trim();
            if (thankYouAmount) thankYouAmount.textContent = `$${donationAmountValue} USD`;

            // 2. Animate the progress bar update! (Amazing UX)
            const currentRaised = 3850;
            const targetGoal = 5000;
            const newRaised = currentRaised + donationAmountValue;
            
            const progressFill = document.querySelector('.progress-bar-fill');
            const progressText = document.querySelector('.progress-labels strong');
            
            if (progressFill && progressText) {
                const newPercentage = Math.min((newRaised / targetGoal) * 100, 100);
                progressFill.style.width = `${newPercentage}%`;
                progressText.innerHTML = `$${newRaised.toLocaleString()} / $${targetGoal.toLocaleString()} USD`;
                
                const subText = document.querySelector('.progress-sub');
                if (subText) subText.textContent = `¡Estamos al ${Math.round(newPercentage)}%! Gracias por sumarte.`;
            }

            // 3. Toggle Form and Success card with fade
            donationForm.classList.add('hidden');
            donationSuccess.classList.remove('hidden');
            
            // Scroll to the top of donation card
            const donationCard = document.getElementById('donationFormCard');
            donationCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Reset donation form to make another donation
    resetDonationBtn?.addEventListener('click', () => {
        donationForm?.reset();
        donationForm?.classList.remove('hidden');
        donationSuccess?.classList.add('hidden');
        customAmountGroup?.classList.add('hidden');
        customAmountInput?.removeAttribute('required');
    });


    // ==========================================
    // 7. Newsletter Form
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail');
        
        if (email && email.value) {
            newsletterSuccess?.classList.remove('hidden');
            newsletterForm.reset();
            
            setTimeout(() => {
                newsletterSuccess?.classList.add('hidden');
            }, 4000);
        }
    });

});
