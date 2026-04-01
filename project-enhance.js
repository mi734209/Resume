document.querySelectorAll('.reveal').forEach((el, index) => {
  setTimeout(() => el.classList.add('visible'), 80 * (index + 1));
});

const copyButtons = document.querySelectorAll('[data-copy]');
copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = 'Link Copied';
      setTimeout(() => {
        button.textContent = original;
      }, 1200);
    } catch {
      button.textContent = 'Copy Failed';
      setTimeout(() => {
        button.textContent = 'Copy Project Link';
      }, 1200);
    }
  });
});
