import os, sys


def main():
    print 'RT windmill is starting'
    if len(sys.argv) is 0 or len(sys.argv) is 1 or sys.argv[1] == 'help' or sys.argv[1] == '--help' or sys.argv[1] == '-h' or sys.argv[1] == '--h' or sys.argv[1] == '-help':
        from windmill.bin import admin_options
        if len(sys.argv) > 0:
            admin_options.help(sys.argv[0])
        else:
            admin_options.help()
        sys.exit()

    # MONEKY PATCHING
    # PATH SUBSTITUTION
    from windmill.conf import global_settings
    global_settings.WINDMILL_PATH = os.path.dirname(__file__)
    global_settings.JS_PATH = os.path.join(os.path.dirname(__file__), 'html')
    
    #REGISTERING AMBERJACK TRANSFORMER
    import windmill
    from collective.amberjack.windmill.transforms import create_amberjack_test_file
    windmill.authoring.transforms.registry['amberjack'] = create_amberjack_test_file
    
    #LOADING TUTORIAL FROM THE IDE
    from collective.amberjack.windmill.loading import load_tutorial
    windmill.server.convergence.JSONRPCMethods.load_tutorial=load_tutorial;
    
    # END OF MONKEY PATCHING
    from windmill.bin import admin_lib
    admin_lib.command_line_startup()


if __name__ == "__main__":
    main()

