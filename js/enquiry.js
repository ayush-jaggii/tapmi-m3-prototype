/**
 * Client-Side Enquiry Handling & Validation
 * Group 4: Academic Prototype Website
 */

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.contact__form, .enquiry-form');
  if (!forms.length) return;

  // Read scenario from URL search params if present
  const urlParams = new URLSearchParams(window.location.search);
  const requestedScenario = urlParams.get('scenario');

  forms.forEach(form => {
    const scenarioSelect = form.querySelector('[name="scenario_id"]');
    const statusBox = form.querySelector('.form-status');
    const demoNotice = form.querySelector('.demo-mode-notice');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.querySelector('.m-btn__label, span') : null;
    const testFillBtn = form.querySelector('.btn-test-fill');

    if (scenarioSelect && requestedScenario) {
      if (['emba_b2b', 'mdp_b2b', 'emba_b2c', 'cert_b2b', 'cert_b2c'].includes(requestedScenario)) {
        scenarioSelect.value = requestedScenario;
      }
    }

    // Toggle B2B vs B2C conditional fields
    function updateFieldVisibility() {
      const currentVal = scenarioSelect ? scenarioSelect.value : (form.dataset.scenario || 'emba_b2b');
      const isB2B = currentVal.includes('b2b');
      const b2bFields = form.querySelectorAll('.field-b2b');
      const b2cFields = form.querySelectorAll('.field-b2c');

      b2bFields.forEach(el => el.style.display = isB2B ? 'grid' : 'none');
      b2cFields.forEach(el => el.style.display = isB2B ? 'none' : 'grid');

      const emailLabel = form.querySelector('.label-email');
      if (emailLabel) {
        emailLabel.textContent = isB2B ? 'Work email' : 'Email address';
      }
    }

    if (scenarioSelect) {
      scenarioSelect.addEventListener('change', updateFieldVisibility);
      updateFieldVisibility();
    }

    // Check system connection status via GET /api/enquiry
    fetch('/api/enquiry')
      .then(r => r.json())
      .then(data => {
        const isConnected = data.connected === true;
        if (demoNotice) {
          demoNotice.textContent = isConnected 
            ? 'Connected to enquiry system' 
            : 'Demo mode: not connected to the CRM';
          demoNotice.className = isConnected 
            ? 'demo-mode-notice is-connected' 
            : 'demo-mode-notice is-demo';
        }
        if (submitLabel) {
          submitLabel.textContent = isConnected ? 'Send project enquiry' : 'Test enquiry flow';
        }
      })
      .catch(() => {
        if (demoNotice) {
          demoNotice.textContent = 'Demo mode: not connected to the CRM';
          demoNotice.className = 'demo-mode-notice is-demo';
        }
        if (submitLabel) {
          submitLabel.textContent = 'Test enquiry flow';
        }
      });

    // Quick fill with synthetic demo fixture
    if (testFillBtn) {
      testFillBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentScenario = scenarioSelect ? scenarioSelect.value : (form.dataset.scenario || 'emba_b2b');
        let fixture = null;
        if (window.CONFIG && window.CONFIG.fixtures) {
          fixture = window.CONFIG.fixtures.find(f => f.scenario_id === currentScenario) || window.CONFIG.fixtures[0];
        } else {
          fixture = {
            name: "Demo Professional",
            email: "demo.professional@example.com",
            organisation: "Technology Services Ltd",
            job_role: "Lead Engineer",
            participant_count: "1",
            capability_need: "Strengthen leadership and strategic decision making."
          };
        }

        const nameInput = form.querySelector('[name="name"]');
        const emailInput = form.querySelector('[name="email"]');
        const orgInput = form.querySelector('[name="organisation"]');
        const roleInput = form.querySelector('[name="job_role"]');
        const countInput = form.querySelector('[name="participant_count"]');
        const needInput = form.querySelector('[name="capability_need"]');
        const consentCheckbox = form.querySelector('[name="consent"]');

        if (nameInput) nameInput.value = fixture.name;
        if (emailInput) emailInput.value = fixture.email;
        if (orgInput) orgInput.value = fixture.organisation || '';
        if (roleInput) roleInput.value = fixture.job_role || '';
        if (countInput) countInput.value = fixture.participant_count || '1';
        if (needInput) needInput.value = fixture.capability_need || '';
        if (consentCheckbox) consentCheckbox.checked = true;

        if (statusBox) {
          statusBox.hidden = false;
          statusBox.className = 'form-status is-info';
          statusBox.textContent = `Loaded synthetic demo fixture for ${fixture.name} (${currentScenario}).`;
        }
      });
    }

    // Submit handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.reportValidity()) return;

      const consentCheck = form.querySelector('[name="consent"]');
      if (!consentCheck || !consentCheck.checked) {
        if (statusBox) {
          statusBox.hidden = false;
          statusBox.className = 'form-status is-error';
          statusBox.textContent = 'Please confirm acknowledgement of the student project disclaimer to proceed.';
        }
        return;
      }

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((val, key) => {
        payload[key] = val;
      });

      payload.consent = true;
      payload.is_test = payload.is_test === 'true' || (payload.email && payload.email.endsWith('@example.com'));
      payload.source_page = window.location.pathname;

      // Capture UTM params from page URL
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(p => {
        if (urlParams.get(p)) payload[p] = urlParams.get(p);
      });

      if (submitBtn) submitBtn.disabled = true;
      if (statusBox) {
        statusBox.hidden = false;
        statusBox.className = 'form-status is-pending';
        statusBox.textContent = 'Processing project enquiry...';
      }

      try {
        const res = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          statusBox.className = 'form-status is-success';
          statusBox.innerHTML = `<strong>Thank you for your enquiry. We will contact you.</strong>`;
          // Reset form fields safely
          form.reset();
        } else {
          statusBox.className = 'form-status is-error';
          statusBox.textContent = data.message || 'We could not confirm receipt. Your details are still in this form. Please try again.';
        }
      } catch (err) {
        statusBox.className = 'form-status is-error';
        statusBox.textContent = 'We could not confirm receipt. Your details are still in this form. Please try again.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
});
