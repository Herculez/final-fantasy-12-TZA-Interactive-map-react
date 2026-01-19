const MapNavigation = ({ onNext, onPrevious, hasNext, hasPrevious, currentMapName }) => {
    return (
        <div style={styles.container}>
            <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                style={{
                    ...styles.button,
                    ...(hasPrevious ? {} : styles.buttonDisabled),
                    }}
            >
                Previous
            </button>

            <div style={styles.mapName}>
                {currentMapName}
            </div>

            <button
                onClick={onNext}
                disabled={!hasNext}
                style={{
                    ...styles.button,
                    ...(hasNext ? {} : styles.buttonDisabled),
                }}
            >
                Next
            </button>
        </div>
    );
};

const styles = {
    container: {},
    button: {},
    buttonDisabled: {},
    mapName: {},
};

export default MapNavigation;