import { RefreshControl, StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import MiniButton from "../components/MiniButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getNotificationsByUserId, markReadNotifications } from "../assets/data/user";
import CustomModal from "../components/CustomModal";
import CustomAlert from "../components/CustomAlert";


const Notifications = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [refresh, setRefresh] = useState(false); //modal refresh
  const [notifUserId, setNotifUserId] = useState('');

  const [reload, setReload] = useState(true);

  const handleBackButton = () => {
    navigation.goBack();
  }

  useEffect(() => {
    fetchNotifications();
  }, [reload]);

  // Use useFocusEffect hook to hide the CustomAlert when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Cleanup function to reset showAlert when the screen loses focus
        setRefresh(false);
        setShowModal(false);
        setNotifUserId('');
        setSuccessMessage({});
      };
    }, [])
  );

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const notif = await getNotificationsByUserId();
      setNotifications(notif);
      //console.log(notif)
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotif = (nu_id) => {
    setNotifUserId(nu_id)
    setShowModal(true)
  }

  const handleCancel = () => {
    setNotifUserId('')
    setShowModal(false)
  }

  const handleOk = async () => {
    setRefresh(true);
    const response = await markReadNotifications(notifUserId);
    setRefresh(false);
    setShowModal(false);
    setNotifUserId('')

    if (response.stt === 'ok') {
        setSuccessMessage({ type: 'success', msg: response.msg });
    } else {
        setSuccessMessage({ type: 'danger', msg: response.msg });
    }
    // Show the alert for 1 second and then clear the success message
    setTimeout(() => {
        setSuccessMessage({});
    }, 700);

    setReload(prev => !prev);
  }

  const hasPendingNotifications = (notifications) => {
    return notifications.some((notification) => notification.status === "pending");
  };

  const renderNotificationRow = (notification) => {
    const isPending = notification.status === "pending";
    return (
      <View style={styles.notificationRow} key={notification.notif_rs_id}>
        <View style={[styles.notificationIcon, { backgroundColor: isPending ? colors.primary : colors.gray }]}>
          {isPending ? <Ionicons name="notifications" size={24} color={colors.white} /> : <Ionicons name="checkmark-done" size={24} color={colors.white} />}
        </View>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationDateTime}>{notification.notif_date}</Text>
          <Text style={styles.notificationText}>{notification.notification}</Text>
        </View>
        <View style={styles.notificationMarkReadIcon}>
            { isPending ?
                <TouchableOpacity onPress={() => handleNotif(notification.notif_rs_id)}>
                    <Ionicons name="checkmark" size={24} color={colors.primary} />
                </TouchableOpacity>
            :
                <Ionicons name="checkmark-done" size={24} color={colors.gray} />
            }
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topWrapper}>
            <MiniButton
                bgColor={colors.border}
                func={handleBackButton}
                content={<Ionicons name="chevron-back" size={18} color={colors.textDark} />}
            />
            {
                notifications !== null ? (
                    hasPendingNotifications(notifications) && (
                        <TouchableOpacity
                        style={styles.markAllWrapper}
                        onPress={() => handleNotif("all")}
                        >
                        <Text style={styles.markAllStyles}>Mark All as Read </Text>
                        <Ionicons name="checkmark" size={24} color={colors.primary} />
                        </TouchableOpacity>
                    )
                ) : (null)
            }
        </View>
        <ScrollView
          style={styles.notificationWrapper}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchNotifications} />
          }
        >
          {
            notifications !== null ? (
                notifications.map((notification) => renderNotificationRow(notification))
            ) : (
                <View style={styles.errorWrapper}>
                    <Text style={styles.errorTextStyles}>No Notifications Yet !</Text>
                </View>
            )
          }
        </ScrollView>
        {
            showModal && (
                <View style={styles.alertStyles}>
                    <CustomModal
                        title={'Mark All as Read'}
                        content={'Are you sure? '}
                        cancelButtonText={'Cancel'}
                        okButtonText={'Confirm'}
                        pressCancel = {handleCancel}
                        pressOk={handleOk}
                        refresh={refresh}
                    />
                </View>
            )
        }
        {Object.keys(successMessage).length > 0 && (
            <View style={styles.alertStyles}>
                <CustomAlert type={successMessage.type} msg={successMessage.msg} />
            </View>
        )}
      </View>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  markAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.primaryDark,
  },
  notificationWrapper: {
    marginTop: 20,
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  notificationDateTime: {
    fontSize: 12,
    color: colors.gray,
  },
  notificationText: {
    fontSize: 14,
    color: colors.textDark,
  },
  notificationMarkReadIcon: {
    marginLeft: 10,
  },
  alertStyles: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
    errorWrapper : {
        backgroundColor: colors.border,
        padding: 10,
        borderRadius: 10,
    },
    errorTextStyles : {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textDark,
        textAlign: 'center',
    },
});
