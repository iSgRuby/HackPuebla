"""
Authentication module for the Monitor Installer
Handles login flow and credential validation
"""

import customtkinter as ctk
import time
from typing import Callable, Optional


class AuthenticationFrame(ctk.CTkFrame):
    """Frame handling user authentication"""
    
    def __init__(self, parent, on_login_success: Callable[[str, str], None]):
        super().__init__(parent)
        
        self.on_login_success = on_login_success
        self.is_logged_in = False
        
        self.setup_ui()
        self.setup_bindings()
        
    def setup_ui(self):
        """Create authentication UI elements"""
        # Title
        self.auth_title = ctk.CTkLabel(
            self,
            text="Parent Authentication",
            font=ctk.CTkFont(size=16, weight="bold")
        )
        self.auth_title.pack(pady=(15, 20))
        
        # Parent username field
        self.parent_user_label = ctk.CTkLabel(
            self,
            text="Parent Username:",
            font=ctk.CTkFont(size=12)
        )
        self.parent_user_label.pack(pady=(5, 5))
        
        self.parent_user_entry = ctk.CTkEntry(
            self,
            width=250,
            placeholder_text="Enter parent username"
        )
        self.parent_user_entry.pack(pady=(0, 10))
        
        # Parent password field
        self.parent_password_label = ctk.CTkLabel(
            self,
            text="Parent Password:",
            font=ctk.CTkFont(size=12)
        )
        self.parent_password_label.pack(pady=(5, 5))
        
        self.parent_password_entry = ctk.CTkEntry(
            self,
            width=250,
            placeholder_text="Enter parent password",
            show="•"
        )
        self.parent_password_entry.pack(pady=(0, 15))
        
        # Login button
        self.login_button = ctk.CTkButton(
            self,
            text="Login",
            command=self.login_parent,
            width=120,
            height=32
        )
        self.login_button.pack(pady=(5, 15))
        
        # Status label for auth feedback
        self.auth_status_label = ctk.CTkLabel(
            self,
            text="",
            font=ctk.CTkFont(size=11)
        )
        self.auth_status_label.pack(pady=(0, 15))
        
    def setup_bindings(self):
        """Set up event bindings for authentication"""
        # Enter key bindings
        self.parent_user_entry.bind("<Return>", lambda e: self.parent_password_entry.focus())
        self.parent_password_entry.bind("<Return>", lambda e: self.login_parent())
        
    def login_parent(self):
        """Handle parent login authentication"""
        username = self.parent_user_entry.get().strip()
        password = self.parent_password_entry.get().strip()
        
        if not username or not password:
            self.update_auth_status("❌ Please enter both username and password")
            return
        
        # Disable login button during authentication
        self.login_button.configure(state="disabled", text="Logging in...")
        self.update_auth_status("🔄 Authenticating...")
        
        # Update UI to show processing
        self.update()
        
        try:
            if self.validate_parent_credentials(username, password):
                self.is_logged_in = True
                
                # Update UI for successful login
                self.login_button.configure(
                    text="✅ Logged In",
                    fg_color="green",
                    hover_color="darkgreen"
                )
                
                # Disable input fields
                self.parent_user_entry.configure(state="disabled")
                self.parent_password_entry.configure(state="disabled")
                
                self.update_auth_status("✅ Login successful!")
                
                # Call success callback with True return value
                self.on_login_success(username, password)
                return True
                
            else:
                self.update_auth_status("❌ Invalid username or password")
                self.login_button.configure(state="normal", text="Login")
                return False
                
        except Exception as e:
            self.update_auth_status(f"❌ Login error: {str(e)}")
            self.login_button.configure(state="normal", text="Login")
            return False
    
    def validate_parent_credentials(self, username: str, password: str) -> bool:
        """Validate parent user credentials"""
        # Simulate network delay
        time.sleep(1)
        
        # Demo credentials (replace with actual authentication logic)
        valid_users = {
            "parent": "password123",
            "admin": "admin123",
            "demo": "demo"
        }
        
        return username.lower() in valid_users and valid_users[username.lower()] == password
    
    def update_auth_status(self, message: str):
        """Update authentication status message"""
        self.auth_status_label.configure(text=message)
        
    def get_credentials(self) -> tuple[Optional[str], Optional[str]]:
        """Get the current credentials if logged in"""
        if self.is_logged_in:
            return self.parent_user_entry.get(), self.parent_password_entry.get()
        return None, None