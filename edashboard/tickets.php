<?php 
session_start();
 

// Check if the user is logged in
if (!isset($_SESSION['employee_id'])) {
    header("Location: login"); // Redirect to login page if not logged in
    exit();
} 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tickets - Analytics Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        body {
            display: flex;
            height: 100vh;
            background-color: black;
        }
        .sidebar {
            width: 20vw;
            background-color: black;
            color: white;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }
        .sidebar a {
            text-decoration: none;
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-radius: 5px;
            transition: 0.3s;
        }
        .sidebar a:hover, .sidebar a.active {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .main {
            flex: 1;
            padding: 20px;
            background: radial-gradient(circle, white, skyblue, lightgreen);
            border-radius: 15px;
            margin: 20px;
            display: flex;
            flex-direction: column;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .header-icons {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        .header-icons .icon {
            background: white;
            border-radius: 50%;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
        /* Ticket List */
        .ticket-list {
    gap: 15px;
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(100vh - 60px); /* Adjust based on header size */
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #636363 transparent; /* Thumb visible, track transparent */
}

/* Scrollbar for WebKit Browsers */
.ticket-list::-webkit-scrollbar {
    width: 1px;
}

.ticket-list::-webkit-scrollbar-track {
    background: transparent; /* Transparent track */
}

.ticket-list::-webkit-scrollbar-thumb {
    background: #FFD489; /* Scrollbar color */
    border-radius: 10px;
    opacity: 0.7; /* Slightly transparent */
}

.ticket-list::-webkit-scrollbar-thumb:hover {
    background: #ffbb66; /* Lighter shade on hover */
}

        .ticket-item {
            background: rgba(156, 109, 109, 0.39);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 15px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
            color: rgb(4, 1, 19);
        }
        .ticket-item:hover {
            transform: scale(1.02);
        }
        /* Hover Modal */
        .modal-hover {
            display: none;
            position: absolute;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            width: 300px;
            z-index: 10;
            transition: opacity 0.2s ease-in-out;
        }
        .sidebar a.logout {
            color: red;
            margin-top: auto;
        }
        .notification-user-status { position: relative; cursor: pointer; }
.badge-user {
    position: absolute;
    top: -9px;
    right: -5px;
     background: red;
    color: white;
    border-radius: 15%;
    padding: 2px 6px;
    font-size: 9px;
    opacity: 0.7;
}
    </style>
</head>
<body>

    <!-- Sidebar Navigation -->
    <nav class="sidebar">
    <?php 
   include 'side_bar.php';
    ?>
    </nav>

    <!-- Main Section -->
    <main class="main" style="overflow-y: auto; overflow-x: hidden;">
        <div class="header">
            <h2>Tickets</h2>
            <div class="header-icons">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTicketModal">Create Ticket</button>

                <div class="icon"><i class="bi bi-bell"></i></div>
                <div class="icon"><i class="bi bi-envelope"></i></div>
                <div class="icon notification-user-status">
                    <i class="bi bi-person"></i>
                    <span class="badge-user" id="status">Online</span>
                </div>
            </div>
        </div>
        <!-- Ticket List -->
        <div class="ticket-list" id="ticketList" style="  flex-direction: column;  width: 100%; padding: 6%; "   >
            <!-- Tickets will be loaded here via AJAX -->
        </div>
        
                <!-- Create Ticket Modal -->
                <div class="modal fade" id="createTicketModal" tabindex="-1" aria-labelledby="createTicketModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" style="background: radial-gradient(circle, #2c2c2c, #1a1a1a, #0d0d0d); border: none; color: #fff;">
                            <div class="modal-header" style="background: rgba(88, 87, 87, 0.5); backdrop-filter: blur(10px); border: none;">
                                <h5 class="modal-title" id="createTicketModalLabel">Create New Ticket</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="ticketForm" method="POST" action="create_ticket.php">
                                    <div class="mb-3">
                                        <label for="ticketTitle" class="form-label">Title*</label>
                                        <input type="text" class="form-control" id="title" name="title" required 
                                            style="background: #979696; color: #fff; border-color: #333;">
                                    </div>
                                    <div class="mb-3">
                                        <label for="ticketDescription" class="form-label">Description*</label>
                                        <textarea class="form-control" id="description" name="description" rows="3" required
                                            style="background: #1a1a1a; color: #fff; border-color: #333;"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ticketPriority" class="form-label">Priority*</label>
                                        <select class="form-control" id="ticketPriority" name="priority" required
                                            style="background: #1a1a1a; color: #fff; border-color: #333;">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <?php 
                                    include 'backend/db.php';
                                    $sql = "SELECT * FROM employees";
                                    $result = $conn->query($sql);
                                    ?>
                                    <div class="mb-3">
                                        <label for="assignTo" class="form-label">Assign To*</label>
                                        <select class="form-control" id="assignTo" name="assignee" required
                                            style="background: #1a1a1a; color: #fff; border-color: #333;">
                                            <?php
                                            if ($result->num_rows > 0) {
                                                while($row = $result->fetch_assoc()) {
                                                    echo '<option value="' . htmlspecialchars($row['full_name']) . '">' . htmlspecialchars($row['full_name']) . ' <small style="font-size:10px">(' . htmlspecialchars($row['role']) . ')</small></option>';
                                                }
                                            }
                                            ?>
                                        </select>
                                    </div>
                                    
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <input type="submit" class="btn btn-primary" value="Create Ticket" form="ticketForm">
                            </div>
                        </div>
                    </div>
                </div>
 

  

    <!-- Hover Modal -->
    <div class="modal-hover" id="ticketModal">
        <h4 id="ticketTitle"></h4>
        <p id="ticketDescription"></p>
        <small id="ticketStatus"></small>
    </div>
<script>
           
               
 $(document).ready(function () {
    function loadTickets() {
        $.ajax({
            url: 'fetch_tickets.php',
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('#ticketList').html(data.tickets);
            },
            error: function () {
                console.error("Failed to load tickets.");
            }
        });
    }

    // Load tickets initially
    loadTickets();

    // Auto-refresh every 3 seconds (3000ms) for faster updates
    setInterval(loadTickets, 3000);

  
    // Show hover modal with ticket details
    $(document).on('mouseenter', '.ticket-item', function (e) {
        let ticketId = $(this).data('id');
        let modal = $('#ticketModal');

        $.ajax({
            url: 'get_ticket_details.php',
            method: 'POST',
            data: { id: ticketId },
            dataType: 'json',
            cache: false,
            success: function (ticket) {
                $('#ticketTitle').text(ticket.title);
                $('#ticketDescription').text(ticket.description);
                $('#ticketStatus').text('Status: ' + ticket.status);

                modal.css({
                    top: e.pageY + 10 + 'px',
                    left: e.pageX + 10 + 'px'
                }).fadeIn(200);
            }
        });
    });

    $(document).on('mouseleave', '.ticket-item', function () {
        $('#ticketModal').fadeOut(200);
    });
});
</script>
<script>
          // mouse and keyboard activity capture code
          let inactivityTimer;
        let isInactive = false;
        const employeeId = <?php echo json_encode($_SESSION['employee_id']); ?>;
        
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            if (isInactive) {
                updateStatus("online");
                isInactive = false;
            }
            inactivityTimer = setTimeout(() => {
                if (!isInactive) {
                    updateStatus("offline");
                                        isInactive = true;
                                    }
                                }, 1200000); // 20 minutes inactivity timeout
                            }
                            
        function updateStatus(status) {
            if (!employeeId) return;
            
            $.ajax({
                url: "update_status.php",
                type: "POST",
                data: {
                    employee_id: employeeId,
                    status: status || "offline"
                },
                success: function (response) {
                    console.log("Status updated:", status);
                    $("#status").text(status); // Update the status badge text
                },
                error: function () {
                    console.log("Error updating status");
                }
            });
        }

        // Handle page visibility changes
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Page is hidden (minimized or tab switched)
                clearTimeout(inactivityTimer);
                updateStatus("other tab");
            } else {
                // Page is visible again
                resetInactivityTimer();
                updateStatus("online");
            }
        });
        
        // Listen for mouse and keyboard activity
        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("keydown", resetInactivityTimer);
        
        // Send periodic heartbeat to keep session alive
        setInterval(() => {
            if (!document.hidden) {
                resetInactivityTimer();
            }
        }, 30000); // Every 30 seconds

        // Start the inactivity timer initially
        resetInactivityTimer();
        </script>
<script>
 
let lastClearTime = localStorage.getItem('lastClearTime') ? new Date(localStorage.getItem('lastClearTime')) : new Date();
let lastNotificationId = localStorage.getItem('lastNotificationId') || 0;

// Request notification permission when page loads
if ("Notification" in window) {
    Notification.requestPermission();
}

function showNotification(message, sender) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`New Message from ${sender}`, {
            body: message,
            icon: '/path/to/icon.png' // Add your notification icon path
        });
    }
}

function fetchNotifications() {
    $.ajax({
        url: "notifications.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            let dropdown = $("#notification-dropdown");
            let messageContainer = $("#message");
            let notificationBadge = $("#notifications");

            // Filter messages based on lastClearTime
            let messages = response.message.filter(msg => new Date(msg.created_at) > lastClearTime);

            // Check for new notifications
            let newMessages = messages.filter(msg => msg.id > lastNotificationId);
            newMessages.forEach(msg => {
                showNotification(msg.message, msg.sender_name);
                lastNotificationId = msg.id;
            });

            // Update localStorage for last notification ID
            if (newMessages.length > 0) {
                localStorage.setItem('lastNotificationId', lastNotificationId);
            }

            // Update notification count badge
            notificationBadge.text(messages.length > 0 ? messages.length : "");

            // Clear previous messages and update dropdown content
            messageContainer.empty();

            if (messages.length === 0) {
                messageContainer.append(`<p class="text-center">No new notifications</p>`);
            } else {
                // Add "Clear All" button
                messageContainer.append(`
                    <button id="clearAll" class="btn btn-danger btn-sm w-100 mb-2">
                        Clear All Notifications
                    </button>
                `);

                // Display notifications
                messages.forEach(msg => {
                    messageContainer.append(`
                        <div class="notification-item" style="padding: 10px; border-bottom: 1px solid #eee;">
                            <strong>${msg.sender_name}</strong>
                            <p>${msg.message}</p>
                            <small style="color: #666;">${msg.created_at}</small>
                        </div>
                    `);
                });
                sendNotification()
            }
        },
        error: function() {
            $("#notifications").text("!");
            $("#message").html("<p class='text-danger text-center'>Error fetching notifications</p>");
        }
    });
}
// Notification dropdown toggle
$(".notification-bell").on("click", function(event) {
    event.stopPropagation();
    $("#notification-dropdown").toggle();
});

// Periodically fetch notifications
$(document).ready(function() {
    fetchNotifications();
    setInterval(fetchNotifications, 7500);

    // Clear all notifications handler
    $(document).on("click", "#clearAll", function() {
        lastClearTime = new Date();
        localStorage.setItem('lastClearTime', lastClearTime.toISOString());
        fetchNotifications();
    });

    // Close dropdown when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.notification-bell, #notification-dropdown').length) {
            $('#notification-dropdown').hide();
        }
    });
});


//windows notifications
        function sendNotification() {
            // Check if the browser supports notifications
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notifications.");
                return;
            }

            // Ask for permission if not granted
            if (Notification.permission === "granted") {
                showNotification();
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        showNotification();
                    }
                });
            }
        }

        function showNotification() {
            const notification = new Notification("minitzgo", {
                body: "Checkout you have a new Notification.",
                icon: "images/dlogo.png" // Change to your preferred icon
            });

            // Optional: Add a click event to open a URL
            notification.onclick = function() {
                window.open("https:www.minitzgo.com/edashboard/index");
            };
            
        }
      
</script>
</body>
</html>
