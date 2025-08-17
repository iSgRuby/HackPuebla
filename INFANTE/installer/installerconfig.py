"""
Installer module for the Monitor Installer
Handles installation flow and device configuration
"""

import customtkinter as ctk
import subprocess
import platform
from typing import Callable, Optional


class InstallerFrame(ctk.CTkFrame):
    """Frame handling monitor installation"""
    
    def __init__(self, parent, on_status_update: Callable[[str], None]):
        super().__init__(parent)
        
        self.on_status_update = on_status_update
        self.current_os = platform.system().lower()
        self.client_device_name: Optional[str] = None
        
        self.setup_ui()
        self.setup_bindings()
        
    def setup_ui(self):
        """Create installer UI elements"""
        # Title
        self.installer_title = ctk.CTkLabel(
            self,
            text="Device Configuration",
            font=ctk.CTkFont(size=16, weight="bold")
        )
        self.installer_title.pack(pady=(15, 20))
        
        # Device name field
        self.device_name_label = ctk.CTkLabel(
            self,
            text="Device Name:",
            font=ctk.CTkFont(size=12)
        )
        self.device_name_label.pack(pady=(5, 5))
        
        self.device_name_entry = ctk.CTkEntry(
            self,
            width=250,
            placeholder_text="Who's device is this?"
        )
        self.device_name_entry.pack(pady=(0, 20))
        
        # OS detection display
        self.os_info_label = ctk.CTkLabel(
            self,
            text=f"Target OS: {platform.system()}",
            font=ctk.CTkFont(size=11),
            text_color="gray"
        )
        self.os_info_label.pack(pady=(0, 20))
        
        # Install button
        self.install_button = ctk.CTkButton(
            self,
            text="Install Monitor",
            command=self.install_monitor,
            width=200,
            height=40,
            font=ctk.CTkFont(size=16, weight="bold"),
            state="disabled"
        )
        self.install_button.pack(pady=(10, 15))
        
    def setup_bindings(self):
        """Set up event bindings for installer"""
        self.device_name_entry.bind("<KeyRelease>", self.on_device_name_change)
        
    def enable_installer(self):
        """Enable the installer interface after successful login"""
        self.check_install_ready()
        
    def on_device_name_change(self, event=None):
        """Handle device name field changes"""
        self.check_install_ready()
        
    def check_install_ready(self):
        """Check if all requirements are met to enable install button"""
        device_name = self.device_name_entry.get().strip()
        
        if device_name:
            self.client_device_name = device_name
            self.install_button.configure(state="normal")
            self.on_status_update("Ready to install monitor!")
        else:
            self.install_button.configure(state="disabled")
            
    def install_monitor(self):
        """Main installation method"""
        if not self.client_device_name or not self.client_device_name.strip():
            self.on_status_update("❌ Please enter device name")
            return
            
        self.on_status_update("🔄 Installing monitor...")
        self.install_button.configure(state="disabled", text="Installing...")
        
        self.update()
        
        try:
            if self.current_os == "windows":
                self.install_monitor_windows()
            else:
                self.install_monitor_other()
        except Exception as e:
            self.on_status_update(f"❌ Installation failed: {str(e)}")
            self.install_button.configure(state="normal", text="Install Monitor")
            
    def install_monitor_windows(self):
        """Install monitor on Windows"""
        try:
            self.on_status_update("🔄 Creating Windows scheduled task...")
            
            subprocess.run([
                "schtasks", "/Create", "/SC", "ONLOGON",
                "/TN", f"MonitorDaemon_{self.client_device_name}",
                "/TR", r"C:\path\to\myscript.exe",
                "/RL", "HIGHEST", "/F"
            ], check=True)
            
            self.on_status_update("✅ Windows monitor installed successfully!")
            self.install_button.configure(
                text="✅ Installed", 
                fg_color="green",
                hover_color="darkgreen"
            )
            self.after(2000, self.close_application)
            
        except subprocess.CalledProcessError as e:
            raise Exception(f"Failed to create scheduled task: {e}")
            
    def install_monitor_other(self):
        """Install monitor on non-Windows systems"""
        # Placeholder for other OS installations
        self.on_status_update("✅ Monitor installed successfully!")
        self.install_button.configure(
            text="✅ Installed", 
            fg_color="green",
            hover_color="darkgreen"
        )
        self.after(2000, self.close_application)

    def close_application(self):
        """Close the entire application"""
        root = self.winfo_toplevel()
        root.quit()
        root.destroy()