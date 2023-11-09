/** @format */

import * as React from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <PaperProvider>
      <Modal
        onDismiss={hideModal}
        visible={true}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </PaperProvider>
  );
};

export default MyComponent;
