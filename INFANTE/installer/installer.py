"""
Main window module for the Monitor Installer
Orchestrates the authentication and installation flows
"""

import customtkinter as ctk
import sys
from typing import Optional

# Import our custom modules
from parentauth import AuthenticationFrame
from installerconfig import InstallerFrame


class MonitorInstallerApp(ctk.CTk):
    """Main application window"""
    
    def __init__(self):
        super().__init__()
        
        # Configure window
        self.title("Syntax Monitor Installer")
        self.geometry("800x600")  # Smaller initially for login only
        self.resizable(False, False)
        
        # Configure theme
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")
        
        # Initialize application state
        self.setup_variables()
        
        # Create UI - only login initially
        self.setup_login_ui()
        
        # Set up window closing behavior
        self.protocol("WM_DELETE_WINDOW", self.on_closing)
        
    def setup_variables(self):
        """Initialize application state variables"""
        self.parent_user: Optional[str] = None
        self.parent_password: Optional[str] = None
        self.is_authenticated = False
        
    def setup_login_ui(self):
        """Create login-only UI"""
        self.main_frame = ctk.CTkFrame(self)
        self.main_frame.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Header
        self.header_label = ctk.CTkLabel(
            self.main_frame,
            text="Monitor Installer",
            font=ctk.CTkFont(size=28, weight="bold")
        )
        self.header_label.pack(pady=(20, 10))
        
        self.subtitle_label = ctk.CTkLabel(
            self.main_frame,
            text="Please authenticate to continue",
            font=ctk.CTkFont(size=14),
            text_color="gray"
        )
        self.subtitle_label.pack(pady=(0, 20))
        
        # Authentication frame
        self.auth_frame = AuthenticationFrame(
            self.main_frame,
            on_login_success=self.on_authentication_success
        )
        self.auth_frame.pack(fill="x", padx=20, pady=(0, 20))
        
    def on_authentication_success(self, username: str, password: str):
        """Handle successful authentication - returns True and loads installer"""
        self.parent_user = username
        self.parent_password = password
        self.is_authenticated = True
        
        # Load the installer interface
        self.load_installer_interface()
        
        return True
        
    def load_installer_interface(self):
        """Load the installer interface after successful authentication"""
        # Destroy current UI
        self.main_frame.destroy()
        
        # Resize window for full interface
        self.geometry("500x600")
        
        # Create full UI
        self.setup_full_ui()
        
    def setup_full_ui(self):
        """Create full application UI after authentication"""
        self.main_frame = ctk.CTkFrame(self)
        self.main_frame.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Header
        self.header_label = ctk.CTkLabel(
            self.main_frame,
            text="Monitor Installer",
            font=ctk.CTkFont(size=28, weight="bold")
        )
        self.header_label.pack(pady=(20, 10))
        
        self.subtitle_label = ctk.CTkLabel(
            self.main_frame,
            text=f"Welcome, {self.parent_user}!",
            font=ctk.CTkFont(size=14),
            text_color="green"
        )
        self.subtitle_label.pack(pady=(0, 20))
        
        # Installer section
        self.installer_frame = InstallerFrame(
            self.main_frame,
            on_status_update=self.update_main_status
        )
        self.installer_frame.pack(fill="x", padx=20, pady=(10, 20))
        self.installer_frame.enable_installer()  # Enable immediately since we're authenticated
        
        # Status section
        self.status_frame = ctk.CTkFrame(self.main_frame)
        self.status_frame.pack(fill="x", padx=20, pady=(0, 20))
        
        self.status_label = ctk.CTkLabel(
            self.status_frame,
            text="Ready to install! Enter device name to continue.",
            font=ctk.CTkFont(size=12),
            wraplength=400
        )
        self.status_label.pack(pady=15)
        
    def update_main_status(self, message: str):
        """Update the main status display"""
        if hasattr(self, 'status_label'):
            self.status_label.configure(text=message)
        
    def on_closing(self):
        """Handle application closing"""
        self.quit()
        self.destroy()


def main():
    """Main entry point for the application"""
    try:
        # Create and run the application
        app = MonitorInstallerApp()
        app.mainloop()
        
    except Exception as e:
        # Handle any startup errors
        print(f"Application failed to start: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()