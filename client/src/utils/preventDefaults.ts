function preventDefaults(e: Event | React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
}

export default preventDefaults;
