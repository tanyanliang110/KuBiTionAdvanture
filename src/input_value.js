function readInputValue(sender, fallback) {
    if (sender && sender.nativeEvent && sender.nativeEvent.target) {
        return sender.nativeEvent.target.value;
    }
    return fallback;
}
