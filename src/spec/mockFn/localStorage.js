class MockLocalStorage {
  clear() {
    Object.keys(this).forEach((key) => {
      if (key !== 'clear') delete this[key];
    });
  }
}

export default MockLocalStorage;
